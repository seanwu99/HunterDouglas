var
    chartOeeTrend,
    chartSixBigLosses,
    chartEvents,
    chartFloorMap,
    chartEquipmentFailure,
    chartSetupAndAdjustments,
    chartIdlingAndMinorStops,
    chartReducedSpeed,
    chartProcessDefects,
    chartReducedYield;

function chartOeeTrendInit(title, series) {
    var chartSeries;
    if (series == null) {
        var OEE = [];
        var Availability = [];
        var Performance = [];
        var Quality = [];
        var n = 100;
        var tm = Math.round(new Date().getTime() / 1000) * 1000 - n * 3000;
        for (var i = 0; i < n; i++) {
            tm += 3000;
            Availability.push([tm, 85 + Math.round((Math.random() * 14))]);
            Performance.push([tm, 85 + Math.round((Math.random() * 14))]);
            Quality.push([tm, 85 + Math.round((Math.random() * 14))]);
            OEE.push([tm, Availability[Availability.length - 1][1] * Performance[Performance.length - 1][1] * Quality[Quality.length - 1][1] / 10000]);
        }
        chartSeries = [];
        chartSeries.push({
            name: 'OEE',
            data: OEE
        });
        chartSeries.push({
            name: 'Availability',
            data: Availability
        });
        chartSeries.push({
            name: 'Performance',
            data: Performance
        });

        chartSeries.push({
            name: 'Quality',
            data: Quality
        });
    } else {
        chartSeries = series;
    }
    chartOeeTrend = new Highcharts.stockChart('chartOeeTrend', {
        credits: {
            enabled: false,
            href: 'http://www.rtsperfectplant.com/',
            position: {
                align: 'right',
                x: -10,
                verticalAlign: 'bottom',
                y: -5
            },
            style: {
                cursor: 'pointer',
                color: '#999999',
                fontSize: '9px'
            },
            text: 'RTS Consulting Inc.'
        },
        title: {
            text: title,
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: 'subtitle',
            floating: false,
            align: 'center',
            y: 40,
            style: {
                fontSize: '14px',
                display: 'none'
            }
        },

        chart: {
            type: 'spline',
            margin: [0, 90, 0, 90],
            // width: 3108,
            events: {
                load: function () {
// 					alert('load');
                }
            }
        },
        colors: [
            '#d9534f',//'#90ed7d',
            '#5cb85c',//'#7cb5ec',
            '#f0ad4e',//'#f7a35c',
            '#2f71aa',//'#888888'
        ],
        legend: {
            enabled: true,
            align: "center",
            verticalAlign: "bottom",
            shadow: false,
        },
        rangeSelector: {
            buttons: [{
                type: 'minute',
                count: 1,
                text: 'm.'
            }, {
                type: 'hour',
                count: 1,
                text: 'H'
            }, {
                type: 'hour',
                count: 8,
                text: 'S'
            }, {
                type: 'day',
                count: 1,
                text: 'D'
            }, {
                type: 'week',
                count: 1,
                text: 'W'
            }, {
                type: 'month',
                count: 1,
                text: 'M'
            }, {
                type: 'all',
                text: 'All'
            }],
            selected: 0
        },

        yAxis: {
            min: 50,
            max: 100,
            title: {
                text: 'yAxis',
                enabled: false,
            },
            labels: {
                enabled: true,
                formatter: function () {
//              return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    return this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> (%)<br/>',
            valueDecimals: 2,
            split: false
        },
        navigator: {
            enabled: true
        },
        series: chartSeries
    });
}

function chartSixBigLossesInit(title, series) {
    var chartSeries = [];
    var chartCategories = [
        rtsOEEM.sblEquipmentFailure.title,
        rtsOEEM.sblSetupAndAdjustments.title,
        rtsOEEM.sblIdlingAndMinorStops.title,
        rtsOEEM.sblReducedSpeed.title,
        rtsOEEM.sblProcessDefects.title,
        rtsOEEM.sblReducedYield.title
    ];

    if (series == null) {
        rtsOEEM.sblEquipmentFailure.occurrences = Math.round(10 + Math.random() * 100);
        rtsOEEM.sblEquipmentFailure.totalizer = Math.round(5000);
        rtsOEEM.sblSetupAndAdjustments.occurrences = Math.round(10 + Math.random() * 100);
        rtsOEEM.sblSetupAndAdjustments.totalizer = Math.round(5000);
        rtsOEEM.sblIdlingAndMinorStops.occurrences = Math.round(10 + Math.random() * 100);
        rtsOEEM.sblIdlingAndMinorStops.totalizer = Math.round(5000);
        rtsOEEM.sblReducedSpeed.occurrences = Math.round(10 + Math.random() * 100);
        rtsOEEM.sblReducedSpeed.totalizer = Math.round(5000);
        rtsOEEM.sblProcessDefects.occurrences = Math.round(10 + Math.random() * 100);
        rtsOEEM.sblProcessDefects.totalizer = Math.round(5000);
        rtsOEEM.sblReducedYield.occurrences = Math.round(10 + Math.random() * 100);
        rtsOEEM.sblReducedYield.totalizer = Math.round(5000);
        var b6 =
            rtsOEEM.sblEquipmentFailure.totalizer +
            rtsOEEM.sblSetupAndAdjustments.totalizer +
            rtsOEEM.sblIdlingAndMinorStops.totalizer +
            rtsOEEM.sblReducedSpeed.totalizer +
            rtsOEEM.sblProcessDefects.totalizer +
            rtsOEEM.sblReducedYield.totalizer;
        var r1 = (100 * rtsOEEM.sblEquipmentFailure.totalizer / b6) | 0;
        var r2 = (100 * rtsOEEM.sblSetupAndAdjustments.totalizer / b6) | 0;
        var r3 = (100 * rtsOEEM.sblIdlingAndMinorStops.totalizer / b6) | 0;
        var r4 = (100 * rtsOEEM.sblReducedSpeed.totalizer / b6) | 0;
        var r5 = (100 * rtsOEEM.sblProcessDefects.totalizer / b6) | 0;
        var r6 = (100 * rtsOEEM.sblReducedYield.totalizer / b6) | 0;

        rtsOEEM.sblEquipmentFailure.rate.shift();
        rtsOEEM.sblEquipmentFailure.rate.push(r1);
        rtsOEEM.sblSetupAndAdjustments.rate.shift();
        rtsOEEM.sblSetupAndAdjustments.rate.push(r2);
        rtsOEEM.sblIdlingAndMinorStops.rate.shift();
        rtsOEEM.sblIdlingAndMinorStops.rate.push(r3);
        rtsOEEM.sblReducedSpeed.rate.shift();
        rtsOEEM.sblReducedSpeed.rate.push(r4);
        rtsOEEM.sblProcessDefects.rate.shift();
        rtsOEEM.sblProcessDefects.rate.push(r5);
        rtsOEEM.sblReducedYield.rate.shift();
        rtsOEEM.sblReducedYield.rate.push(r6);
        chartSeries.push(rtsOEEM.sblEquipmentFailure.rate[rtsOEEM.sblEquipmentFailure.rate.length - 1]);
        chartSeries.push(rtsOEEM.sblSetupAndAdjustments.rate[rtsOEEM.sblSetupAndAdjustments.rate.length - 1]);
        chartSeries.push(rtsOEEM.sblIdlingAndMinorStops.rate[rtsOEEM.sblIdlingAndMinorStops.rate.length - 1]);
        chartSeries.push(rtsOEEM.sblReducedSpeed.rate[rtsOEEM.sblReducedSpeed.rate.length - 1]);
        chartSeries.push(rtsOEEM.sblProcessDefects.rate[rtsOEEM.sblProcessDefects.rate.length - 1]);
        chartSeries.push(rtsOEEM.sblReducedYield.rate[rtsOEEM.sblReducedYield.rate.length - 1]);
    }
    for (var i = 0; i < 5; i++) {
        for (var j = i + 1; j < 6; j++) {
            if (chartSeries[i] < chartSeries[j]) {
                var t1 = chartSeries[i];
                chartSeries[i] = chartSeries[j];
                chartSeries[j] = t1;
                var t2 = chartCategories[i];
                chartCategories[i] = chartCategories[j];
                chartCategories[j] = t2;
            }
        }
    }
    chartSixBigLosses = Highcharts.chart('chartSixBigLosses', {
        chart: {
//          backgroundColor: '#f0f0f0',
            margin: [10, 50, 20, 50],
//          width: 600,
            height: 400,
        },
        credits: {
            enabled: false,
            href: 'http://www.rtsperfectplant.com/',
            position: {
                align: 'right',
                x: -10,
                verticalAlign: 'bottom',
                y: -5
            },
            style: {
                cursor: 'pointer',
                color: '#999999',
                fontSize: '9px'
            },
            text: 'RTS Consulting Inc.'
        },
        title: {
            text: title,
            style: {
                display: 'none'
            }
        },
        xAxis: {
            categories: chartCategories
        },
        labels: {
            items: [{
                html: 'Six Big Losses',
                style: {
                    left: '80px',
                    top: '18px',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        },
        series: [
            {
                type: 'column',
                colorByPoint: true,
                name: 'items',
                data: chartSeries,
                showInLegend: false
            },
            {
                type: 'spline',
                name: 'Accumulate',
                data: [
                    chartSeries[0],
                    chartSeries[0] + chartSeries[1],
                    chartSeries[0] + chartSeries[1] + chartSeries[2],
                    chartSeries[0] + chartSeries[1] + chartSeries[2] + chartSeries[3],
                    chartSeries[0] + chartSeries[1] + chartSeries[2] + chartSeries[3] + chartSeries[4],
                    chartSeries[0] + chartSeries[1] + chartSeries[2] + chartSeries[3] + chartSeries[4] + chartSeries[4],
                ],
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                }
            },
            {
                type: 'pie',
                name: 'Ratio',
                data: [{
                    name: chartCategories[0],
                    y: chartSeries[0],
                    //              color: Highcharts.getOptions().colors[0] // item's color
                }, {
                    name: chartCategories[1],
                    y: chartSeries[1],
                    //              color: Highcharts.getOptions().colors[1] // item's color
                }, {
                    name: chartCategories[2],
                    y: chartSeries[2],
                    //              color: Highcharts.getOptions().colors[2] // item's color
                }, {
                    name: chartCategories[3],
                    y: chartSeries[3],
                    //              color: Highcharts.getOptions().colors[3] // item's color
                }, {
                    name: chartCategories[4],
                    y: chartSeries[4],
                    //              color: Highcharts.getOptions().colors[4] // item's color
                }, {
                    name: chartCategories[5],
                    y: chartSeries[5],
                    //              color: Highcharts.getOptions().colors[5] // item's color
                }],
                center: [100, 100],
                size: 150,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            }],
        legend: {
            enabled: false,
            align: "center",
            verticalAlign: "bottom",
            shadow: false,
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'yAxis',
                enabled: false,
            },
            labels: {
                formatter: function () {
//              return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    return this.value + '%';
                }
            },
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },
    });
    // cc(chartSixBigLosses.axes[1].toPixels(80, false));
    chartSixBigLosses.renderer.path(['M', 50, chartSixBigLosses.axes[1].toPixels(rtsOEEM.bigLossFilter, false), 'H', 1000, chartSixBigLosses.axes[1].toPixels(rtsOEEM.bigLossFilter, false)]).attr({
        'stroke-width': 1,
        stroke: Highcharts.getOptions().colors[0],
        dashstyle: 'dash'
    }).add();
}

function chartEventsInit(title, series) {
    var chartSeries;
    var reasons = [
        'ToolingFailure',
        'UnplannedMaint',
        'EquipmentFailure',
        'Setup&Changeover',
        'MaterialShortage',
        'OperatorShortage',
        'WarmUpTime',
        'ObstructedFlow',
        'ComponentJams',
        'Misfeeds',
        'SensorBlocked',
        'CleaningChecking',
        'RoughRunning',
        'UnderCapacity',
        'EquipmentWear',
        'OperatorInnefficiency',
        'Scrap',
        'Rework',
        'InProcessDamage',
        'InProcessExpiration',
        'IncorrectAssembly',
        'Unassigned',
        'FailureCtr'
    ];

    var n = 7;// = Math.round(10 + Math.random() * 5);
    rtsOEEM.events = [];
    rtsOEEM.events.push({
        'reason': reasons[Math.round(Math.random() * (reasons.length - 1))],
        'occurrences': Math.round(3 + Math.random() * 10),
        'totalizer': Math.round(100 + Math.random() * 5000)
    });
    for (var i = 0; i < n; i++) {
        var r = '';
        do {
            r = reasons[Math.round(Math.random() * (reasons.length - 1))];
            var m = -1;
            for (var j = 0; j < rtsOEEM.events.length; j++) {
                if (rtsOEEM.events[j]['reason'] == r) {
                    m = j;
                }
            }
        } while (m > 0);

        rtsOEEM.events.push({
            'reason': r,
            'occurrences': Math.round(3 + Math.random() * 10),
            'totalizer': Math.round(100 + Math.random() * 5000)
        });
    }

    chartSeries = [];
    $.each(rtsOEEM.events, function (i, event) {
        chartSeries.push({name: event['reason'], y: event['totalizer']});
    });

    chartEvents = Highcharts.chart('chartEvents', {
        credits: {
            enabled: false,
            href: 'http://www.rtsperfectplant.com/',
            position: {
                align: 'right',
                x: -10,
                verticalAlign: 'bottom',
                y: -5
            },
            style: {
                cursor: 'pointer',
                color: '#999999',
                fontSize: '9px'
            },
            text: 'RTS Consulting Inc.'
        },
        title: {
            text: title,
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: 'subtitle',
            floating: false,
            align: 'center',
            y: 40,
            style: {
                fontSize: '14px',
                display: 'none'
            }
        },
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 60
            },
//          margin: [0, 165, 0, 165],
            margin: [10, 0, 20, 0],
// width: 600,
            height: 400,
        },
        plotOptions: {
            pie: {
                innerSize: 150,
                depth: 45
            }
        },
        series: [{
            name: 'During',
            data: chartSeries,
//          data: [
//            {name: 'Break Time (12:00PM)', y: 15, color: '#337ab7'},
//            {name: 'Running', y: 25, color: '#5cb85c'},
//            {name: 'Tooling Failure', y: 3, color: '#d9534f'},
//            {name: 'Running', y: 32, color: '#5cb85c'},
//            {name: 'Equipment Failure', y: 3, color: '#d9534f'},
//            {name: 'Running', y: 17, color: '#5cb85c'},
//            {name: 'Misfeeds', y: 13, color: '#f0ad4e'},
//            {name: 'Running', y: 17, color: '#5cb85c'},
//            {name: '', y: 240, color: '#ffffff'},
//            {name: 'Changeover (6:00AM)', y: 10, color: '#f0ad4e'},
//            {name: 'Running', y: 30, color: '#5cb85c'},
//            {name: 'Material Shortage', y: 17, color: '#f0ad4e'},
//            {name: 'Running', y: 23, color: '#5cb85c'},
//            {name: 'Sensor Blocked', y: 3, color: '#d9534f'},
//            {name: 'Running', y: 37, color: '#5cb85c'},
//            {name: 'Break Time (8:00AM)', y: 15, color: '#337ab7'},
//            {name: 'Running', y: 25, color: '#5cb85c'},
//            {name: 'Sensor Blocked', y: 3, color: '#d9534f'},
//            {name: 'Running', y: 52, color: '#5cb85c'},
//            {name: 'Sensor Blocked', y: 3, color: '#d9534f'},
//            {name: 'Running', y: 22, color: '#5cb85c'},
//            {name: 'Meal Time (10:00AM)', y: 30, color: '#337ab7'},
//            {name: 'Running', y: 10, color: '#5cb85c'},
//            {name: 'Sensor Blocked', y: 3, color: '#d9534f'},
//            {name: 'Running', y: 47, color: '#5cb85c'},
//            {name: 'Operator Shortage', y: 7, color: '#f0ad4e'},
//            {name: 'Running', y: 23, color: '#5cb85c'},
//          ]
        }]
    });
    var thead = "<thead><tr><th>Events</th><th>Occurrences</th><th>Totalizer</th></tr></thead><tbody>";
    var n = 0;
    var tbody = "";
    $.each(rtsOEEM.events, function (i, event) {
        tbody = tbody + '<tr><td>' + event['reason'] + '</td><td>' + '</td><td>' + event['occurrences'] + '</td><td>' + (new Date(event['totalizer'] * 1000)).toISOString().substr(11, 8) + '</td> </tr>';
    });

    document.getElementById('eventsTable').innerHTML = thead + tbody + '</tbody>';

}

function chartFloorMapInit(title, series) {
    var OPs = [{
        text: '<u>OP 10</u><br>LaserMarker<br>#1 Pinion', 'x': 60, 'y': 30 + 0 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>OP 10</u><br>LaserMarker<br>#2 Pinion', 'x': 60, 'y': 30 + 1 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>OP 10</u><br>LaserMarker<br>#1 Ring', 'x': 60, 'y': 30 + 2 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>OP 10</u><br>LaserMarker<br>#2 Ring', 'x': 60, 'y': 30 + 3 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>OP 10</u><br>LaserMarker<br>#3 Ring', 'x': 60, 'y': 30 + 4 * 80, 'padType': 'Pad80x50'
    }, {
        text: '.', 'x': 200, 'y': 30 + 2 * 80, 'padType': 'Pad60x50'
    }, {
        text: '<u>OP 20</u><br>Cutter<br>#1 Pinion', 'x': 280, 'y': 70 + 0 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>OP 20</u><br>Cutter<br>#2 Pinion', 'x': 390, 'y': 70 + 0 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>OP 20</u><br>Cutter<br>#3 Pinion', 'x': 390, 'y': 70 + 1 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>OP 20</u><br>Cutter<br>#4 Pinion', 'x': 390, 'y': 70 + 2 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>OP 20</u><br>Cutter<br>#5 Pinion', 'x': 390, 'y': 70 + 3 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>OP 20</u><br>Cutter<br>#6 Pinion', 'x': 280, 'y': 70 + 3 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>OP 20</u><br>Cutter<br>#1 Ring', 'x': 610, 'y': 70 + 0 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>OP 20</u><br>Cutter<br>#2 Ring', 'x': 490, 'y': 70 + 0 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>OP 20</u><br>Cutter<br>#3 Ring', 'x': 490, 'y': 70 + 1 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>OP 20</u><br>Cutter<br>#4 Ring', 'x': 490, 'y': 70 + 2 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>OP 20</u><br>Cutter<br>#5 Ring', 'x': 490, 'y': 70 + 3 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>OP 20</u><br>Cutter<br>#6 Ring', 'x': 610, 'y': 70 + 3 * 80, 'padType': 'Pad80x50'
    }, {
        text: '.', 'x': 620, 'y': 30 + 2 * 80, 'padType': 'Pad60x50'
    }, {
        text: '.', 'x': 845, 'y': 90 + 0 * 80, 'padType': 'Pad60x50'
    }, {
        text: '.', 'x': 845, 'y': 50 + 3 * 80, 'padType': 'Pad60x50'
    }, {
        text: '<u>Furnace #1</u><br>Pinions<br>Rings', 'x': 940, 'y': 70 + 0 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>Furnace #2</u><br>Pinions<br>Rings', 'x': 940, 'y': 70 + 1 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>Furnace #3</u><br>Pinions<br>Rings', 'x': 940, 'y': 70 + 2 * 80, 'padType': 'Pad80x50'
    }, {
        text: '<u>Furnace #4</u><br>Pinions<br>Rings', 'x': 940, 'y': 70 + 3 * 80, 'padType': 'Pad80x50'
    },
    ];

    chartFloorMap = Highcharts.chart('chartFloorMap', {
        credits: {
            enabled: false
        },
        chart: {
            margin: [0, 0, 0, 0],
            width: 1080,
            height: 400,
            backgroundColor: '#ffffff',
            events: {
                load: function () {

                    var ren = this.renderer,
                        colors = Highcharts.getOptions().colors,
                        rightArrow = ['M', 0, 0, 'L', 100, 0, 'L', 95, 5, 'M', 100, 0, 'L', 95, -5],
                        leftArrow = ['M', 100, 0, 'L', 0, 0, 'L', 5, 5, 'M', 0, 0, 'L', 5, -5];

                    ren.path(['M', 105, 50, 'L', 105, 350]).attr({'stroke-width': 5, stroke: '#c0c0c0'}).add();
                    ren.path(['M', 100, 200, 'L', 320, 200]).attr({'stroke-width': 5, stroke: '#c0c0c0'}).add();

                    ren.path(['M', 435, 30, 'L', 435, 320, 'L', 325, 320, 'L', 325, 80, 'L', 435, 80]).attr({
                        'stroke-width': 5,
                        stroke: '#c0c0c0'
                    }).add();
                    // ren.path(['M', 325, 80, 'L', 325, 320, 'L', 435, 320, 'L', 435, 80, 'L', 325, 80]).attr({
                    //     'stroke-width': 5,
                    //     stroke: '#c0c0c0'
                    // }).add();

                    ren.path(['M', 535, 30, 'L', 535, 320, 'L', 655, 320, 'L', 655, 80, 'L', 535, 80]).attr({
                        'stroke-width': 5,
                        stroke: '#c0c0c0'
                    }).add();
                    // ren.path(['M', 535, 80, 'L', 535, 320, 'L', 655, 320, 'L', 655, 80, 'L', 535, 80]).attr({
                    //     'stroke-width': 5,
                    //     stroke: '#c0c0c0'
                    // }).add();
                    ren.path(['M', 655, 200, 'L', 985, 200,]).attr({
                        'stroke-width': 5,
                        stroke: '#c0c0c0'
                    }).add();
                    ren.path(['M', 880, 80, 'L', 880, 320,]).attr({
                        'stroke-width': 5,
                        stroke: '#c0c0c0'
                    }).add();
                    ren.path(['M', 985, 80, 'L', 985, 320,]).attr({
                        'stroke-width': 5,
                        stroke: '#c0c0c0'
                    }).add();

                    $.each(OPs, function (i, o) {
                        ren.label(o.text, o.x, o.y, 'rect', 10, 10, true, true, o.padType).attr({
                            fill: '#337ab7',
                            stroke: 'white',
                            'stroke-width': 2,
                            padding: 5,
                            r: 5,
                        }).css({color: 'white', fontSize: '12px',}).add().shadow(true);
                    });
                    ren.label('Serial NumberSummary RanCycle CompleteMachine #Date/TimeOperator', 270, 10).attr({
                        fill: '#c0c0c0', stroke: 'c0c0c0',
                        'stroke-width': 2,
                        padding: 5,
                        r: 5,
                    }).css({color: 'white', fontSize: '12px',}).add().shadow(false);

                    ren.label('FORT WAYNE GEARS LINE PART 1', 840, 365).attr({
                        fill: '#337ab7', stroke: '#white',
                        'stroke-width': 1,
                        padding: 5,
                        r: 5,
                    }).css({color: 'white', fontSize: '12px', 'font-weight': 'bold'}).add().shadow(false);

                    ren.image('Common/img/iconPC.png', 715, 40, 90, 80).add();
                    ren.image('Common/img/iconPC.png', 715, 275, 90, 80).add();
                    ren.image('Common/img/iconScanner.png', 212, 180, 36, 36).add();
                    ren.image('Common/img/iconScanner.png', 632, 180, 36, 36).add();
                    ren.image('Common/img/iconScanner.png', 857, 80, 36, 36).add();
                    ren.image('Common/img/iconScanner.png', 857, 280, 36, 36).add();
                    ren.circle(325, 200, 15).attr({
                        fill: 'white', stroke: '#2f71aa', 'stroke-width': 10
                    }).add();
                    ren.circle(775, 200, 40).attr({fill: '#2f71aa', stroke: '#c0c0c0', 'stroke-width': 4}).add();
                    ren.text('PARTS<br>TRAY', 753, 200)
                        .attr({
                            rotation: 0
                        })
                        .css({
                            color: '#ffffff',
                            fontSize: '16px'
                        })
                        .add();

                    ren.circle(880, 200, 15).attr({fill: 'white', stroke: '#2f71aa', 'stroke-width': 10}).add();
                    ren.path(['M', 190, 370, 'L', 190, 285, 'C', 190, 260, 190, 260, 215, 260, 'L', 290, 260, 'L', 285, 265, 'M', 290, 260, 'L', 285, 255,]).attr({
                        'stroke-width': 2,
                        stroke: colors[3]
                    }).add();
                    ren.path(['M', 190, 30, 'L', 190, 115, 'C', 190, 140, 190, 140, 215, 140, 'L', 290, 140, 'L', 285, 135, 'M', 290, 140, 'L', 285, 145,]).attr({
                        'stroke-width': 2,
                        stroke: colors[3]
                    }).add();
                    ren.path(['M', 700, 140, 'L', 900, 140, 'C', 925, 140, 925, 140, 925, 115, 'L', 925, 80, 'L', 920, 85, 'M', 925, 80, 'L', 930, 85,]).attr({
                        'stroke-width': 2,
                        stroke: colors[3]
                    }).add();
                    ren.path(['M', 700, 260, 'L', 900, 260, 'C', 925, 260, 925, 260, 925, 285, 'L', 925, 320, 'L', 920, 315, 'M', 925, 320, 'L', 930, 315,]).attr({
                        'stroke-width': 2,
                        stroke: colors[3]
                    }).add();
                }
            }
        },
        title: {
            text: 'title',
            style: {
                color: 'black',
                display: 'none'
            }
        }
    });

    var ELE = document.getElementsByClassName("highcharts-Pad80x50-box");// Pad fixing
    $.each(ELE, function (i, ele) {
        ele.setAttribute("width", 80);
        ele.setAttribute("height", 50);
    });

    var ELE = document.getElementsByClassName("highcharts-Pad60x50-box");// Pad fixing
    $.each(ELE, function (i, ele) {
        ele.setAttribute("width", 60);
        ele.setAttribute("height", 50);
    });

    var ELE = document.getElementsByClassName("highcharts-label highcharts-Pad80x50");//Font fixing
    $.each(ELE, function (i, ele) {
        if (ele.nodeName == 'DIV') {
            ele.children[0].style['left'] = '3px';
            ele.children[0].style['top'] = '-13px';
            ele.children[0].style['width'] = '75px';
            ele.children[0].style['text-align'] = 'center';
            ele.children[0].style['line-height'] = '14px';
        }
    });
}

function sblEquipmentFailure(newRate, occurrences, totalizer) {
    rtsOEEM.sblEquipmentFailure.rate.shift();
    rtsOEEM.sblEquipmentFailure.rate.push(newRate);
    rtsOEEM.sblEquipmentFailure.occurrences = occurrences;
    rtsOEEM.sblEquipmentFailure.totalizer = totalizer;
    chartEquipmentFailure.series[0].setData(rtsOEEM.sblEquipmentFailure.rate);
    var c = rtsOEEM.sblEquipmentFailure.rate[rtsOEEM.sblEquipmentFailure.rate.length - 1] < rtsOEEM.sblEquipmentFailure.rate[rtsOEEM.sblEquipmentFailure.rate.length - 2] ?
        "<li>This loss decreased at a rate of <span class=\"label label-success pull-right \" style=\"font-size: 14px\">" :
        "<li>This loss increased at a rate of <span class=\"label label-danger pull-right\" style=\"font-size: 14px\">";
    document.getElementById('rateEquipmentFailure').innerHTML = c +
        rtsOEEM.sblEquipmentFailure.rate[rtsOEEM.sblEquipmentFailure.rate.length - 1] + "%" +
        "</span></li><li>Occurrences <span class=\"badge badge-default\" style=\"font-size: 14px\">" +
        rtsOEEM.sblEquipmentFailure.occurrences +
        "</span>, Totalizer <span class=\"label label-default pull-right\" style=\"font-size: 14px\">" +
        (new Date(rtsOEEM.sblEquipmentFailure.totalizer * 1000)).toISOString().substr(11, 8) + "</span></li>";
}

function sblSetupAndAdjustments(newRate, occurrences, totalizer) {
    rtsOEEM.sblSetupAndAdjustments.rate.shift();
    rtsOEEM.sblSetupAndAdjustments.rate.push(newRate);
    rtsOEEM.sblSetupAndAdjustments.occurrences = occurrences;
    rtsOEEM.sblSetupAndAdjustments.totalizer = totalizer;
    chartSetupAndAdjustments.series[0].setData(rtsOEEM.sblSetupAndAdjustments.rate);
    var c = rtsOEEM.sblSetupAndAdjustments.rate[rtsOEEM.sblSetupAndAdjustments.rate.length - 1] < rtsOEEM.sblSetupAndAdjustments.rate[rtsOEEM.sblSetupAndAdjustments.rate.length - 2] ?
        "<li>This loss decreased at a rate of <span class=\"label label-success pull-right \" style=\"font-size: 14px\">" :
        "<li>This loss increased at a rate of <span class=\"label label-danger pull-right\" style=\"font-size: 14px\">";
    document.getElementById('rateSetupAndAdjustments').innerHTML = c +
        rtsOEEM.sblSetupAndAdjustments.rate[rtsOEEM.sblSetupAndAdjustments.rate.length - 1] + "%" +
        "</span></li><li>Occurrences <span class=\"badge badge-default\" style=\"font-size: 14px\">" +
        rtsOEEM.sblSetupAndAdjustments.occurrences +
        "</span>, Totalizer <span class=\"label label-default pull-right\" style=\"font-size: 14px\">" +
        (new Date(rtsOEEM.sblSetupAndAdjustments.totalizer * 1000)).toISOString().substr(11, 8) + "</span></li>";
}

function sblIdlingAndMinorStops(newRate, occurrences, totalizer) {
    rtsOEEM.sblIdlingAndMinorStops.rate.shift();
    rtsOEEM.sblIdlingAndMinorStops.rate.push(newRate);
    rtsOEEM.sblIdlingAndMinorStops.occurrences = occurrences;
    rtsOEEM.sblIdlingAndMinorStops.totalizer = totalizer;
    chartIdlingAndMinorStops.series[0].setData(rtsOEEM.sblIdlingAndMinorStops.rate);
    var c = rtsOEEM.sblIdlingAndMinorStops.rate[rtsOEEM.sblIdlingAndMinorStops.rate.length - 1] < rtsOEEM.sblIdlingAndMinorStops.rate[rtsOEEM.sblIdlingAndMinorStops.rate.length - 2] ?
        "<li>This loss decreased at a rate of <span class=\"label label-success pull-right \" style=\"font-size: 14px\">" :
        "<li>This loss increased at a rate of <span class=\"label label-danger pull-right\" style=\"font-size: 14px\">";
    document.getElementById('rateIdlingAndMinorStops').innerHTML = c +
        rtsOEEM.sblIdlingAndMinorStops.rate[rtsOEEM.sblIdlingAndMinorStops.rate.length - 1] + "%" +
        "</span></li><li>Occurrences <span class=\"badge badge-default\" style=\"font-size: 14px\">" +
        rtsOEEM.sblIdlingAndMinorStops.occurrences +
        "</span>, Totalizer <span class=\"label label-default pull-right\" style=\"font-size: 14px\">" +
        (new Date(rtsOEEM.sblIdlingAndMinorStops.totalizer * 1000)).toISOString().substr(11, 8) + "</span></li>";
}

function sblReducedSpeed(newRate, occurrences, totalizer) {
    rtsOEEM.sblReducedSpeed.rate.shift();
    rtsOEEM.sblReducedSpeed.rate.push(newRate);
    rtsOEEM.sblReducedSpeed.occurrences = occurrences;
    rtsOEEM.sblReducedSpeed.totalizer = totalizer;
    chartReducedSpeed.series[0].setData(rtsOEEM.sblReducedSpeed.rate);
    var c = rtsOEEM.sblReducedSpeed.rate[rtsOEEM.sblReducedSpeed.rate.length - 1] < rtsOEEM.sblReducedSpeed.rate[rtsOEEM.sblReducedSpeed.rate.length - 2] ?
        "<li>This loss decreased at a rate of <span class=\"label label-success pull-right \" style=\"font-size: 14px\">" :
        "<li>This loss increased at a rate of <span class=\"label label-danger pull-right\" style=\"font-size: 14px\">";
    document.getElementById('rateReducedSpeed').innerHTML = c +
        rtsOEEM.sblReducedSpeed.rate[rtsOEEM.sblReducedSpeed.rate.length - 1] + "%" +
        "</span></li><li>Occurrences <span class=\"badge badge-default\" style=\"font-size: 14px\">" +
        rtsOEEM.sblReducedSpeed.occurrences +
        "</span>, Totalizer <span class=\"label label-default pull-right\" style=\"font-size: 14px\">" +
        (new Date(rtsOEEM.sblReducedSpeed.totalizer * 1000)).toISOString().substr(11, 8) + "</span></li>";
}

function sblProcessDefects(newRate, occurrences, totalizer) {
    rtsOEEM.sblProcessDefects.rate.shift();
    rtsOEEM.sblProcessDefects.rate.push(newRate);
    rtsOEEM.sblProcessDefects.occurrences = occurrences;
    rtsOEEM.sblProcessDefects.totalizer = totalizer;
    chartProcessDefects.series[0].setData(rtsOEEM.sblProcessDefects.rate);
    var c = rtsOEEM.sblProcessDefects.rate[rtsOEEM.sblProcessDefects.rate.length - 1] < rtsOEEM.sblProcessDefects.rate[rtsOEEM.sblProcessDefects.rate.length - 2] ?
        "<li>This loss decreased at a rate of <span class=\"label label-success pull-right \" style=\"font-size: 14px\">" :
        "<li>This loss increased at a rate of <span class=\"label label-danger pull-right\" style=\"font-size: 14px\">";
    document.getElementById('rateProcessDefects').innerHTML = c +
        rtsOEEM.sblProcessDefects.rate[rtsOEEM.sblProcessDefects.rate.length - 1] + "%" +
        "</span></li><li>Occurrences <span class=\"badge badge-default\" style=\"font-size: 14px\">" +
        rtsOEEM.sblProcessDefects.occurrences +
        "</span>, Totalizer <span class=\"label label-default pull-right\" style=\"font-size: 14px\">" +
        (new Date(rtsOEEM.sblProcessDefects.totalizer * 1000)).toISOString().substr(11, 8) + "</span></li>";
}

function sblReducedYield(newRate, occurrences, totalizer) {
    rtsOEEM.sblReducedYield.rate.shift();
    rtsOEEM.sblReducedYield.rate.push(newRate);
    rtsOEEM.sblReducedYield.occurrences = occurrences;
    rtsOEEM.sblReducedYield.totalizer = totalizer;
    chartReducedYield.series[0].setData(rtsOEEM.sblReducedYield.rate);
    var c = rtsOEEM.sblReducedYield.rate[rtsOEEM.sblReducedYield.rate.length - 1] < rtsOEEM.sblReducedYield.rate[rtsOEEM.sblReducedYield.rate.length - 2] ?
        "<li>This loss decreased at a rate of <span class=\"label label-success pull-right \" style=\"font-size: 14px\">" :
        "<li>This loss increased at a rate of <span class=\"label label-danger pull-right\" style=\"font-size: 14px\">";
    document.getElementById('rateReducedYield').innerHTML = c +
        rtsOEEM.sblReducedYield.rate[rtsOEEM.sblReducedYield.rate.length - 1] + "%" +
        "</span></li><li>Occurrences <span class=\"badge badge-default\" style=\"font-size: 14px\">" +
        rtsOEEM.sblReducedYield.occurrences +
        "</span>, Totalizer <span class=\"label label-default pull-right\" style=\"font-size: 14px\">" +
        (new Date(rtsOEEM.sblReducedYield.totalizer * 1000)).toISOString().substr(11, 8) + "</span></li>";
}

function sblChartsInit() {
    chartEquipmentFailure = Highcharts.chart('chartEquipmentFailure', {
        chart: {
            borderWidth: 0,
            type: 'area',
            width: 140,
            height: 55,
//            spacingBottom: 30,
            style: {
                overflow: 'visible'
            },
            margin: [0, 0, 0, 0],
        },
        title: {
            text: 'title',
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: 'subtitle',
            floating: true,
            align: 'right',
            verticalAlign: 'bottom',
            y: 15,
            style: {
                display: 'none'
            }
        },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: [0]
        },
        tooltip: {
            formatter: function () {
//            return '<b>' + this.series.name + '</b><br/>' +
//              this.x + ': ' + this.y;
                return this.y + '%';
            }
        },
        plotOptions: {
            series: {
                animation: false,
            },
            area: {
                fillOpacity: 0.5
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }],
    });
    chartSetupAndAdjustments = Highcharts.chart('chartSetupAndAdjustments', {
        chart: {
            borderWidth: 0,
            type: 'area',
            width: 140,
            height: 55,
//            spacingBottom: 30,
            style: {
                overflow: 'visible'
            },
            margin: [0, 0, 0, 0],
        },
        title: {
            text: 'title',
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: 'subtitle',
            floating: true,
            align: 'right',
            verticalAlign: 'bottom',
            y: 15,
            style: {
                display: 'none'
            }
        },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: [0]
        },
        tooltip: {
            formatter: function () {
//            return '<b>' + this.series.name + '</b><br/>' +
//              this.x + ': ' + this.y;
                return this.y + '%';
            }
        },
        plotOptions: {
            series: {
                animation: false,
            },
            area: {
                fillOpacity: 0.5
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }],
    });
    chartIdlingAndMinorStops = Highcharts.chart('chartIdlingAndMinorStops', {
        chart: {
            borderWidth: 0,
            type: 'area',
            width: 140,
            height: 55,
//            spacingBottom: 30,
            style: {
                overflow: 'visible'
            },
            margin: [0, 0, 0, 0],
        },
        title: {
            text: 'title',
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: 'subtitle',
            floating: true,
            align: 'right',
            verticalAlign: 'bottom',
            y: 15,
            style: {
                display: 'none'
            }
        },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: [0]
        },
        tooltip: {
            formatter: function () {
//            return '<b>' + this.series.name + '</b><br/>' +
//              this.x + ': ' + this.y;
                return this.y + '%';
            }
        },
        plotOptions: {
            series: {
                animation: false,
            },
            area: {
                fillOpacity: 0.5
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }],
    });
    chartReducedSpeed = Highcharts.chart('chartReducedSpeed', {
        chart: {
            borderWidth: 0,
            type: 'area',
            width: 140,
            height: 55,
//            spacingBottom: 30,
            style: {
                overflow: 'visible'
            },
            margin: [0, 0, 0, 0],
        },
        title: {
            text: 'title',
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: 'subtitle',
            floating: true,
            align: 'right',
            verticalAlign: 'bottom',
            y: 15,
            style: {
                display: 'none'
            }
        },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: [0]
        },
        tooltip: {
            formatter: function () {
//            return '<b>' + this.series.name + '</b><br/>' +
//              this.x + ': ' + this.y;
                return this.y + '%';
            }
        },
        plotOptions: {
            series: {
                animation: false,
            },
            area: {
                fillOpacity: 0.5
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }],
    });
    chartProcessDefects = Highcharts.chart('chartProcessDefects', {
        chart: {
            borderWidth: 0,
            type: 'area',
            width: 140,
            height: 55,
//            spacingBottom: 30,
            style: {
                overflow: 'visible'
            },
            margin: [0, 0, 0, 0],
        },
        title: {
            text: 'title',
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: 'subtitle',
            floating: true,
            align: 'right',
            verticalAlign: 'bottom',
            y: 15,
            style: {
                display: 'none'
            }
        },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: [0]
        },
        tooltip: {
            formatter: function () {
//            return '<b>' + this.series.name + '</b><br/>' +
//              this.x + ': ' + this.y;
                return this.y + '%';
            }
        },
        plotOptions: {
            series: {
                animation: false,
            },
            area: {
                fillOpacity: 0.5
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }],
    });
    chartReducedYield = Highcharts.chart('chartReducedYield', {
        chart: {
            borderWidth: 0,
            type: 'area',
            width: 140,
            height: 55,
//            spacingBottom: 30,
            style: {
                overflow: 'visible'
            },
            margin: [0, 0, 0, 0],
        },
        title: {
            text: 'title',
            style: {
                display: 'none'
            }
        },
        subtitle: {
            text: 'subtitle',
            floating: true,
            align: 'right',
            verticalAlign: 'bottom',
            y: 15,
            style: {
                display: 'none'
            }
        },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            startOnTick: false,
            endOnTick: false,
            tickPositions: []
        },
        yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            tickPositions: [0]
        },
        tooltip: {
            formatter: function () {
//            return '<b>' + this.series.name + '</b><br/>' +
//              this.x + ': ' + this.y;
                return this.y + '%';
            }
        },
        plotOptions: {
            series: {
                animation: false,
            },
            area: {
                fillOpacity: 0.5
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: '',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }],
    });
}

function cc(obj) {
    console.log(obj);
}
