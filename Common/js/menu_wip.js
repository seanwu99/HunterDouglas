


// Create the button menus

var oMenuButton1 = new sap.ui.commons.MenuButton({text: "Settings", icon: "Common/img/map.png"});
var oMenuButton2 = new sap.ui.commons.MenuButton({ text: "Dashboards", icon: "Common/img/cloud.png"});
var oMenuButton3 = new sap.ui.commons.MenuButton({text: "Reports", icon: "Common/img/list.png"});
var oMenuButton4 = new sap.ui.commons.MenuButton({text: "Menu4", icon: "Common/img/list.png"});
var oMenuButton5 = new sap.ui.commons.MenuButton({text: "Mold Management", icon: "Common/img/list.png"});

// Create meus for menu buttons

var oMenu1 = new sap.ui.commons.Menu("menu1", {ariaDescription: "Application Setup", enabled:true});
var oMenu2 = new sap.ui.commons.Menu("menu2", {ariaDescription: "Dashboards", enabled:true});
var oMenu3 = new sap.ui.commons.Menu("menu3", {ariaDescription: "Reports", enabled:true});
var oMenu4 = new sap.ui.commons.Menu("menu4", {ariaDescription: "Menu4", enabled:true});
var oMenu5 = new sap.ui.commons.Menu("menu5", {ariaDescription: "Mold Management", enabled:true});

// Create the items and add them to the menu 1------------------	Application Setup		-------------------------------------

var oMenuItem110 = new sap.ui.commons.MenuItem("item1-1-0",{text: "Enterprise Hierarchy", enabled: false});
oMenu1.addItem(oMenuItem110);
var oMenuItem120 = new sap.ui.commons.MenuItem("item1-2-0",{text: "MES Memory Maps", enabled: false});
oMenu1.addItem(oMenuItem120);
var oMenuItem130 = new sap.ui.commons.MenuItem("item1-3-0",{text: "Plant Connectivity", enabled: false});
oMenu1.addItem(oMenuItem130);
var oMenuItem140 = new sap.ui.commons.MenuItem("item1-4-0",{text: "Master Data Setup", enabled: false});
oMenu1.addItem(oMenuItem140);

//-------------------------------------------------------------------------

// Create submenu 6	----------------	Hierarchy Setup			------------------------------

var oMenu6 = new sap.ui.commons.Menu("menu6", {ariaDescription: "Hierarchy Setup", enabled:true});
oMenuItem110.setSubmenu(oMenu6);

//Create the items and add them to the sub menu
var oMenuItem111 = new sap.ui.commons.MenuItem("item1-1-1",{text: "Hierarchy Management", enabled: false});
oMenu6.addItem(oMenuItem111);
var oMenuItem112 = new sap.ui.commons.MenuItem("item1-1-2",{text: "Hierarchy Levels Setup", enabled: false});
oMenu6.addItem(oMenuItem112);

// Create  submenu  7  	--------------	Memory Maps Setup		--------------------------

var oMenu7 = new sap.ui.commons.Menu("menu7", {ariaDescription: "Memory Maps Setup", enabled:true});
oMenuItem120.setSubmenu(oMenu7);
//Create the items and add them to the sub menu
var oMenuItem121 = new sap.ui.commons.MenuItem("item1-2-1",{text: "Memory Map Tags", enabled: false});
oMenu7.addItem(oMenuItem121);
var oMenuItem122 = new sap.ui.commons.MenuItem("item1-2-2",{text: "Memory Map Transactions", enabled: false});
oMenu7.addItem(oMenuItem122);
var oMenuItem123 = new sap.ui.commons.MenuItem("item1-2-3",{text: "PLC Tag Groups", enabled: false});
oMenu7.addItem(oMenuItem123);
var oMenuItem124 = new sap.ui.commons.MenuItem("item1-2-4",{text: "PLC Tag Types", enabled: false});
oMenu7.addItem(oMenuItem124);
var oMenuItem125 = new sap.ui.commons.MenuItem("item1-2-5",{text: "PLC Tag Functions", enabled: false});
oMenu7.addItem(oMenuItem125);

// Create submenu  8  	--------------	Connectivity Setup	-------------------------

var oMenu8 = new sap.ui.commons.Menu("menu8", {ariaDescription: "Connectivity Setup", enabled:true});
oMenuItem130.setSubmenu(oMenu8);
//Create the items and add them to the sub menu
var oMenuItem131 = new sap.ui.commons.MenuItem("item1-3-1",{text: "Shop Floor Operators", enabled: false});
oMenu8.addItem(oMenuItem131);
var oMenuItem132 = new sap.ui.commons.MenuItem("item1-3-2",{text: "Shop Floor Computers", enabled: false});
oMenu8.addItem(oMenuItem132);
var oMenuItem133 = new sap.ui.commons.MenuItem("item1-3-3",{text: "Shop Floor Printers", enabled: false});
oMenu8.addItem(oMenuItem133);
var oMenuItem134 = new sap.ui.commons.MenuItem("item1-3-4",{text: "Plant Connectivity Servers", enabled: false});
oMenu8.addItem(oMenuItem134);
var oMenuItem135 = new sap.ui.commons.MenuItem("item1-3-5",{text: "Plant Connectivity Agents", enabled: false});
oMenu8.addItem(oMenuItem135);

// Create  submenu  9  	--------------	Master Data		------------------------

var oMenu9 = new sap.ui.commons.Menu("menu9", {ariaDescription: "Master Data", enabled:true});
oMenuItem140.setSubmenu(oMenu9);
//Create the items and add them to the sub menu
var oMenuItem141 = new sap.ui.commons.MenuItem("item1-4-1",{text: "Units Of Measure", enabled: false});
oMenu9.addItem(oMenuItem141);
var oMenuItem142 = new sap.ui.commons.MenuItem("item1-4-2",{text: "Products Management", enabled: false});
oMenu9.addItem(oMenuItem142);
var oMenuItem143 = new sap.ui.commons.MenuItem("item1-4-3",{text: "Bills of Materials", enabled: false});
oMenu9.addItem(oMenuItem143);
var oMenuItem144 = new sap.ui.commons.MenuItem("item1-4-4",{text: "Products Routing", enabled: false});
oMenu9.addItem(oMenuItem144);
var oMenuItem145 = new sap.ui.commons.MenuItem("item1-4-5",{text: "Plant Shifts", enabled: false});
oMenu9.addItem(oMenuItem145);

// Create the items and add them to the menu 2 ------------------	Dashboard		-------------------------------------

var oMenuItem210 = new sap.ui.commons.MenuItem("item2-1-0",{text: "Station Dashboard", enabled:false});
oMenu2.addItem(oMenuItem210);

// Create the items and add them to the menu 3 ------------------	Reporting	-------------------------------------

var oMenuItem310 = new sap.ui.commons.MenuItem("item3-1-0",{text: "Production Status Report", enabled:false});
oMenu3.addItem(oMenuItem310);

// Create the items and add them to the menu 4 ------------------	Scheduling		-------------------------------------

var oMenuItem410 = new sap.ui.commons.MenuItem("item4-1-0",{text: "weight-up", enabled:false});
oMenu4.addItem(oMenuItem410);
var oMenuItem411 = new sap.ui.commons.MenuItem("item4-1-1",{text: "scheduling", enabled:false});
oMenu4.addItem(oMenuItem411);

// Create the items and add them to the menu 5 -----------------	Mold Management		-------------------------------------

var oMenuItem510 = new sap.ui.commons.MenuItem("item5-1-0",{text: "Mold Management", enabled:false});
oMenu5.addItem(oMenuItem510);

// ******************************************************************************************************************************************************************

//Attach the Menu to the MenuButton
oMenuButton1.setMenu(oMenu1);
oMenuButton2.setMenu(oMenu2);
oMenuButton3.setMenu(oMenu3);
oMenuButton4.setMenu(oMenu4);
oMenuButton5.setMenu(oMenu5);

// ******************************************************************************************************************************************************************

//Attach an event to raise an alert when an item is selected (Button 1)

oMenuButton1.attachItemSelected(function (oEvent){

    //	alert( oEvent.getParameter("itemId"));

    switch( oEvent.getParameter("itemId")) {

        // SubMenu Settings 6

        case "item1-1-1":
            setTimeout("location.href = '" + "MgtHierarchy.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        case "item1-1-2":
            setTimeout("location.href = '" + "LvlHierarchy.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;

        // SubMenu Settings 7

        case "item1-2-1":
            setTimeout("location.href = '" + "MemMapTags.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        case "item1-2-2":
            setTimeout("location.href = '" + "MemMapTrxs.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        case "item1-2-3":
            setTimeout("location.href = '" + "TagCommGroups.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        case "item1-2-4":
            setTimeout("location.href = '" + "TagTypes.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        case "item1-2-5":
            setTimeout("location.href = '" + "TagFunctions.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;

        // SubMenu Settings 8

        case "item1-3-1":
            setTimeout("location.href = '" + "Operators.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        case "item1-3-2":
            setTimeout("location.href = '" + "Stations.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        case "item1-3-3":
            setTimeout("location.href = '" + "Printers.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        case "item1-3-4":
            setTimeout("location.href = '" + "PCoServers.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        case "item1-3-5":
            setTimeout("location.href = '" + "PCoAgents.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;

        // SubMenu Settings 9

        case "item1-4-1":
            setTimeout("location.href = '" + "UnitsOfMeasure.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        case "item1-4-2":
            setTimeout("location.href = '" + "ProductsMgmt.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        case "item1-4-3":
            setTimeout("location.href = '" + "BomMgmt.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        case "item1-4-4":
            setTimeout("location.href = '" +  "RoutingMgmt.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        case "item1-4-5":
            setTimeout("location.href = '" + "Shifts.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        default:
            // alert("Items \"" + oEvent.getParameter("itemId") + "\" was selected.");
            break;
    }
});

//Attach an event to raise an alert when an item is selected (Button 2)

oMenuButton2.attachItemSelected(function (oEvent){
    switch( oEvent.getParameter("itemId")) {
        case "item2-1-0":
            setTimeout("location.href = '" + "WorkOrders.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        default:
            // alert("Items \"" + oEvent.getParameter("itemId") + "\" was selected.");
            break;
    }
});

//Attach an event to raise an alert when an item is selected. (Button 3)

oMenuButton3.attachItemSelected(function (oEvent){
    switch( oEvent.getParameter("itemId")) {
        // Menu Reports
        case "item3-1-0":
            setTimeout("location.href = '" + "ProductionStatus.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        default:
            //alert("Items \"" + oEvent.getParameter("itemId") + "\" was selected.");
            break;
    }
});

//Attach an event to raise an alert when an item is selected (Button 4)

oMenuButton4.attachItemSelected(function (oEvent){
    switch( oEvent.getParameter("itemId")) {
        case "item4-1-0":
            setTimeout("location.href = '" + "Weigh-up.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        case "item4-1-1":
            setTimeout("location.href = '" + "Weigh-up.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        default:
            // alert("Items \"" + oEvent.getParameter("itemId") + "\" was selected.");
            break;
    }
});

//Attach an event to raise an alert when an item is selected. (Button 5)

oMenuButton5.attachItemSelected(function (oEvent){
    switch( oEvent.getParameter("itemId")) {
        // Menu Reports
        case "item5-1-0":
            setTimeout("location.href = '" + "ProductionStatus.irpt?ROLE=" + document.getElementById("user_role").value + "'",0);
            break;
        default:
            //alert("Items \"" + oEvent.getParameter("itemId") + "\" was selected.");
            break;
    }
});




function roleSecurity() {
    var myRoles = document.getElementById("user_roles").value;
    var role2Access = "MESM_" + document.getElementById("user_role").value;
    //	 alert(role2Access);
    if(myRoles.indexOf(role2Access)<0) {
        window.location.assign("security.irpt");
    } else {
        var roleString = document.getElementById("user_role").value;
        var roleArray = roleString.split("_");
        level2Access = roleArray[0];
        // alert("level : " + level2Access);
        plant2Access =  roleArray[1];
        // alert("plant : " + plant2Access);

        onLoadPage();

        document.getElementById("page_title").innerHTML=role2Access;

        oMenuButton1.placeAt("app_menu");
        oMenuButton2.placeAt("app_menu");
        oMenuButton3.placeAt("app_menu");
        oMenuButton4.placeAt("app_menu");
        oMenuButton5.placeAt("app_menu");

        var role_ADM = "MESM_ADM_"+plant2Access;
        var role_ENG = "MESM_ENG_"+plant2Access;
        var role_SUP = "MESM_SUP_"+plant2Access;
        var role_OPS = "MESM_OPS_"+plant2Access;

        switch(role2Access) {

            case "MESM_ADM_ALL":

                // enable Cfg Hierarchy
                oCore.byId("item1-1-0").setEnabled(true);
                // enable Cfg Memory Maps
                oCore.byId("item1-2-0").setEnabled(true);
                // enable Cfg Connectivity
                oCore.byId("item1-3-0").setEnabled(true);
                // enable Master Data
                oCore.byId("item1-4-0").setEnabled(true);

                // enable Carrier Station Dashboard
                oCore.byId("item2-1-0").setEnabled(true);

                // enable Production Status Shifts Report
                oCore.byId("item3-1-0").setEnabled(true);

                // enable Equipment Hierarchy
                oCore.byId("item1-1-1").setEnabled(true);
                // enable Cfg Hierarchy Levels
                oCore.byId("item1-1-2").setEnabled(true);

                // enable Cfg Memory Maps
                oCore.byId("item1-2-1").setEnabled(true);
                // enable Cfg Tag Types
                oCore.byId("item1-2-2").setEnabled(true);
                // enable Cfg Tag Functions
                oCore.byId("item1-2-3").setEnabled(true);
                // enable Cfg Tag Groups
                oCore.byId("item1-2-4").setEnabled(true);
                // enable Cfg Memory Map Transactions
                oCore.byId("item1-2-5").setEnabled(true);

                // Enable UOM Maintenance
                oCore.byId("item1-3-1").setEnabled(true);
                // Enable Product Maintenance
                oCore.byId("item1-3-2").setEnabled(true);
                // Enable BOM Maintenance
                oCore.byId("item1-3-3").setEnabled(true);
                // Enable Routing Maintenance
                oCore.byId("item1-3-4").setEnabled(true);
                // Enable Shifts
                oCore.byId("item1-3-5").setEnabled(true);

                // scheduling
                oCore.byId("item4-1-0").setEnabled(true);
                oCore.byId("item4-1-1").setEnabled(true);


                // scheduling
                oCore.byId("item5-1-0").setEnabled(true);

                // update screen
                document.getElementById("page_title").innerHTML="ADM ALL PLANTS";

                break;
            case role_ADM:
                // enable Cfg Hierarchy
                oCore.byId("item1-1-0").setEnabled(true);
                // enable Cfg Memory Maps
                oCore.byId("item1-2-0").setEnabled(true);
                // enable Cfg Connectivity
                oCore.byId("item1-3-0").setEnabled(true);
                // enable Master Data
                oCore.byId("item1-4-0").setEnabled(true);

                // enable Carrier Station Dashboard
                oCore.byId("item2-1-0").setEnabled(true);

                // enable Production Status Shifts Report
                oCore.byId("item3-1-0").setEnabled(true);

                // enable Equipment Hierarchy
                oCore.byId("item1-2-1").setEnabled(true);
                // enable Cfg Hierarchy Levels
                oCore.byId("item1-2-2").setEnabled(true);

                // enable Cfg Memory Maps
                oCore.byId("item1-3-1").setEnabled(true);
                // enable Cfg Tag Types
                oCore.byId("item1-3-2").setEnabled(true);
                // enable Cfg Tag Functions
                oCore.byId("item1-3-3").setEnabled(true);
                // enable Cfg Tag Groups
                oCore.byId("item1-3-4").setEnabled(true);
                // enable Cfg Memory Map Transactions
                oCore.byId("item1-3-5").setEnabled(true);

                // Enable UOM Maintenance
                oCore.byId("item1-4-1").setEnabled(true);
                // Enable Product Maintenance
                oCore.byId("item1-4-2").setEnabled(true);
                // Enable BOM Maintenance
                oCore.byId("item1-4-3").setEnabled(true);
                // Enable Routing Maintenance
                oCore.byId("item1-4-4").setEnabled(true);
                // Enable Shifts
                oCore.byId("item1-4-5").setEnabled(true);
                // scheduling
                oCore.byId("item4-1-0").setEnabled(true);
                oCore.byId("item4-1-1").setEnabled(true);


                // scheduling
                oCore.byId("item5-1-0").setEnabled(true);

                // update screen
                document.getElementById("page_title").innerHTML="ADM PLANT "+plant2Access;

                break;
            case "MESM_OPS_ALL":


                document.getElementById("page_title").innerHTML="OPS ALL PLANTS";

                break;
            case role_OPS:

                document.getElementById("page_title").innerHTML="OPS PLANT "+plant2Access;

                break;
            default:
                alert("MES Module Role Unknown: " + role2Access);
                break;
        }

    }
}
