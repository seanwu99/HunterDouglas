/**
 * Draggable points plugin for Highcharts JS
 * Author: Torstein Honsi
 * License: MIT License
 * Version: 2.0.5 (2016-11-03)
 */

/*global document, Highcharts */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory;
    } else {
        factory(Highcharts);
    }
}(function (Highcharts) {

    'use strict';

    var addEvent = Highcharts.addEvent,
        each = Highcharts.each,
        pick = Highcharts.pick;


    /**
     * Filter by dragMin and dragMax
     */
    function filterRange(newY, series, XOrY) {
        var options = series.options,
            dragMin = pick(options['dragMin' + XOrY], undefined),
            dragMax = pick(options['dragMax' + XOrY], undefined),
            precision = pick(options['dragPrecision' + XOrY], undefined);
        // log(series);
        if (!isNaN(precision)) {
            newY = Math.round(newY / precision) * precision;
        }

        if (newY < dragMin) {
            newY = dragMin;
        } else if (newY > dragMax) {
            newY = dragMax;
        }


        return newY;
    }

    function log(obj) {
        console.log(obj);
    }

    Highcharts.Chart.prototype.callbacks.push(function (chart) {

        var container = chart.container,
            dragPoint,
            dragStart,
            dragX,
            dragY,
            dragPlotX,
            dragPlotY,
            dragPlotHigh,
            dragPlotLow,
            changeLow,
            newWidth,
            newHigh,
            newLow;

        /**
         * Get the new values based on the drag event
         */
        function getNewPos(e) {
            var originalEvent = e.originalEvent || e,
                pageX = originalEvent.changedTouches ? originalEvent.changedTouches[0].pageX : e.pageX,
                pageY = originalEvent.changedTouches ? originalEvent.changedTouches[0].pageY : e.pageY,
                series = dragPoint.series,
                draggableX = series.options.draggableX && dragPoint.draggableX !== false,
                draggableY = series.options.draggableY && dragPoint.draggableY !== false,
                dragSensitivity = pick(series.options.dragSensitivity, 1),
                // dragSensitivity = series.options.dragSensitivity,
                deltaX = draggableX ? dragX - pageX : 0,
                deltaY = draggableY ? dragY - pageY : 0,
                newPlotX = dragPlotX - deltaX,
                newPlotY = dragPlotY - deltaY,
                newX = dragX === undefined ? dragPoint.x : series.xAxis.toValue(newPlotX, true),
                newY = dragY === undefined ? dragPoint.y : series.yAxis.toValue(newPlotY, true),
                ret;
            newX = filterRange(newX, series, 'X');
            newY = filterRange(newY, series, 'Y');
            if (dragPoint.low != null) {
                var newPlotHigh = dragPlotHigh - deltaY,
                    newPlotLow = dragPlotLow - deltaY;
                newHigh = dragY === undefined ? dragPoint.high : series.yAxis.toValue(newPlotHigh, true);
                newLow = dragY === undefined ? dragPoint.low : series.yAxis.toValue(newPlotLow, true);
                newHigh = filterRange(newHigh, series, 'Y');
                newLow = filterRange(newLow, series, 'Y');
                var dragMinY = series.options.dragMinY;
                var dragMaxY = series.options.dragMaxY;

                if ((changeLow == 0) && newHigh == dragMaxY) {
                    if (newHigh - newLow < newWidth) {
                        newLow = newHigh - newWidth;
                    }
                } else if ((changeLow == 0) && newLow == dragMinY) {
                    if (newHigh - newLow < newWidth) {
                        newHigh = newLow + newWidth;
                    }
                }

            }
            if (Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) > dragSensitivity) {
                return {
                    x: draggableX ? newX : dragPoint.x,
                    y: draggableY ? newY : dragPoint.y,
                    high: (draggableY && (changeLow == -1) || draggableY && (changeLow == 0)) ? newHigh : dragPoint.high,
                    low: (draggableY && (changeLow == 1) || draggableY && (changeLow == 0)) ? newLow : dragPoint.low,
                };
            } else {
                return null;
            }
        }

        /**
         * Handler for mouseup
         */
        function drop(e) {
            var newPos;
            if (dragPoint) {
                if (e) {
                    newPos = getNewPos(e);
                    if (newPos) {
                        dragPoint.update(newPos);

                        // Update k-d-tree immediately to prevent tooltip jump (#43)
                        dragPoint.series.options.kdNow = true;
                        dragPoint.series.buildKDTree();
                    }
                }
                if (newPos) {
                    newPos.dragStart = dragStart;
                    dragPoint.firePointEvent('drop', newPos);
                }
            }
            dragPoint = dragX = dragY = undefined;
        }

        /**
         * Handler for mousedown
         */
        function mouseDown(e) {
            // log('mouseDown(e)');
            // log(e);
            var options,
                originalEvent = e.originalEvent || e,
                hoverPoint,
                series;

            if ((originalEvent.target.getAttribute('class') || '').indexOf('highcharts-handle') !== -1) {
                hoverPoint = originalEvent.target.point;
            }

            series = chart.hoverPoint && chart.hoverPoint.series;
            if (!hoverPoint && chart.hoverPoint && (!series.useDragHandle || !series.useDragHandle())) {
                hoverPoint = chart.hoverPoint;
            }

            if (hoverPoint) {
                options = hoverPoint.series.options;
                dragStart = {};
                if (options.draggableX && hoverPoint.draggableX !== false) {
                    dragPoint = hoverPoint;
                    dragX = originalEvent.changedTouches ? originalEvent.changedTouches[0].pageX : e.pageX;
                    dragPlotX = dragPoint.plotX;
                    dragStart.x = dragPoint.x;
                }

                if (options.draggableY && hoverPoint.draggableY !== false) {
                    // log('hoverPoint');
                    // log(hoverPoint);
                    dragPoint = hoverPoint;

                    dragY = originalEvent.changedTouches ? originalEvent.changedTouches[0].pageY : e.pageY;
                    dragPlotY = dragPoint.plotY + (chart.plotHeight - (dragPoint.yBottom || chart.plotHeight));
                    dragStart.y = dragPoint.y;
                    if (dragPoint.plotHigh) {
                        dragPlotHigh = dragPoint.plotHigh;
                        dragPlotLow = dragPoint.plotLow;
                        // changeLow = (Math.abs(dragPlotLow - (dragY - 60)) < Math.abs(dragPlotHigh - (dragY - 60))) ? true : false;
                    }
                    var yAxis = hoverPoint.series.yAxis.toValue(e.chartY, false);
                    // log('yAxis: ' + yAxis);
                    var yy = dragPlotLow + (dragPlotHigh - dragPlotLow) * (yAxis - dragPoint.low) / (dragPoint.high - dragPoint.low);
                    // log('dragPlotHigh: ' + dragPlotHigh + '/' + dragPlotLow + '/' + yAxis + '/' + yy);


                    newWidth = hoverPoint.high - hoverPoint.low;
                    if (Math.abs(yy - dragPlotLow) < Math.abs(dragPlotHigh - dragPlotLow) / 10) {
                        changeLow = 1;
                    } else if (Math.abs(yy - dragPlotHigh) < Math.abs(dragPlotHigh - dragPlotLow) / 10) {
                        changeLow = -1;
                    } else {
                        changeLow = 0;
                    }
                    // log('dragPlotHigh: ' + dragPoint.plotHigh + '/' + dragPoint.plotLow);
                    // log('yy: ' + yy + '/' + newWidth + '/' + changeLow);
                }

                // Disable zooming when dragging
                if (dragPoint) {
                    chart.mouseIsDown = false;
                }
            }
        }

        /**
         * Handler for mousemove. If the mouse button is pressed, drag the element.
         */
        function mouseMove(e) {

            if (dragPoint) {

                e.preventDefault();

                var evtArgs = getNewPos(e), // Gets x and y
                    proceed;

                // Fire the 'drag' event with a default action to move the point.
                if (evtArgs) {
                    evtArgs.dragStart = dragStart;
                    dragPoint.firePointEvent(
                        'drag',
                        evtArgs,
                        function () {

                            var kdTree,
                                series = dragPoint.series;

                            proceed = true;

                            dragPoint.update(evtArgs, false);

                            // Hide halo while dragging (#14)
                            if (series.halo) {
                                series.halo = series.halo.destroy();
                            }

                            // Let the tooltip follow and reflect the drag point
                            if (chart.tooltip) {
                                chart.tooltip.refresh(chart.tooltip.shared ? [dragPoint] : dragPoint);
                            }

                            // Stacking requires full redraw
                            if (series.stackKey) {
                                chart.redraw();

                                // Do a series redraw only. Let the k-d-tree survive the redraw in order to
                                // prevent tooltip flickering (#43).
                            } else {

                                kdTree = series.kdTree;
                                series.redraw();
                                series.kdTree = kdTree;
                            }
                        }
                    );


                    // The default handler has not run because of prevented default
                    if (!proceed) {
                        drop();
                    }
                }
            }
        }

        // Kill animation on first drag when chart.animation is set to false.
        chart.redraw();

        // Add'em
        addEvent(container, 'mousemove', mouseMove);
        addEvent(container, 'touchmove', mouseMove);
        addEvent(container, 'mousedown', mouseDown);
        addEvent(container, 'touchstart', mouseDown);
        addEvent(document, 'mouseup', drop);
        addEvent(document, 'touchend', drop);
        addEvent(container, 'mouseleave', drop);
    });

    /**
     * Extend the column chart tracker by visualizing the tracker object for small points
     */
    Highcharts.seriesTypes.column.prototype.useDragHandle = function () {
        var is3d = this.chart.is3d && this.chart.is3d();
        return !is3d;
    };

    Highcharts.seriesTypes.column.prototype.dragHandlePath = function (shapeArgs, strokeW) {
        var x1 = shapeArgs.x,
            y = shapeArgs.y,
            x2 = shapeArgs.x + shapeArgs.width;

        return [
            'M', x1, y + 6 * strokeW,
            'L', x1, y,
            'L', x2, y,
            'L', x2, y + 2 * strokeW,
            'L', x1, y + 2 * strokeW,
            'L', x2, y + 2 * strokeW,
            'L', x2, y + 4 * strokeW,
            'L', x1, y + 4 * strokeW,
            'L', x2, y + 4 * strokeW,
            'L', x2, y + 6 * strokeW
        ];
    };

    Highcharts.wrap(Highcharts.seriesTypes.column.prototype, 'drawTracker', function (proceed) {
        var series = this,
            options = series.options,
            strokeW = series.borderWidth || 0;

        proceed.apply(series);

        if (this.useDragHandle() && (options.draggableX || options.draggableY)) {

            each(series.points, function (point) {

                var path = (options.dragHandlePath || series.dragHandlePath)(point.shapeArgs, strokeW);

                if (!point.handle) {
                    point.handle = series.chart.renderer.path(path)
                        .attr({
                            fill: options.dragHandleFill || 'rgba(0,0,0,0.5)',
                            'class': 'highcharts-handle',
                            'stroke-width': strokeW,
                            'stroke': options.dragHandleStroke || options.borderColor || 1
                        })
                        .css({
                            cursor: 'ns-resize'
                        })
                        .add(series.group);

                    point.handle.element.point = point;
                } else {
                    point.handle.attr({d: path});
                }
            });
        }
    });

}));
