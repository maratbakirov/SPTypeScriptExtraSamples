///<reference path="../Scripts/Typings/Sharepoint//SharePoint.d.ts" />
var StronglyTypedData;
(function (StronglyTypedData) {
    var ListItemWrapper = (function () {
        function ListItemWrapper(listitem) {
            this.listitem = listitem;
        }
        //private title: string;
        // this works for ecmascript and higher
        //set title(value: string) {
        //}
        //get title(): string {
        //}
        ListItemWrapper.prototype.id = function () {
            return this.listitem.get_id();
        };

        ListItemWrapper.prototype.getOrSetAnyValue = function (propertyname, value) {
            if (!(typeof (value) === "undefined")) {
                this.listitem.set_item(propertyname, value);
            }
            return this.listitem.get_item(propertyname);
        };

        ListItemWrapper.prototype.title = function (value) {
            return this.getOrSetAnyValue("Title", value);
        };

        ListItemWrapper.prototype._number = function (value) {
            return this.getOrSetAnyValue("Number", value);
        };
        return ListItemWrapper;
    })();
    StronglyTypedData.ListItemWrapper = ListItemWrapper;

    var resultpanel;
    var collListItem;
    var titleinput;
    var numberinput;

    function getDocumentElements() {
        resultpanel = m$('div#results');
        titleinput = (m$('input#title')[0]);
        numberinput = (m$('input#number')[0]);
    }

    function Init() {
        getDocumentElements();

        var clientContext = SP.ClientContext.get_current();
        var oWebsite = clientContext.get_web();
        var oList = oWebsite.get_lists().getByTitle("StronglyTypedList");
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml('<View><Query></Query>' + '<RowLimit>10</RowLimit></View>');
        collListItem = oList.getItems(camlQuery);

        clientContext.load(collListItem);
        clientContext.executeQueryAsync(success, error);

        function success() {
            var listItemEnumerator = collListItem.getEnumerator();

            var listItemInfo = "";
            while (listItemEnumerator.moveNext()) {
                var oListItem = listItemEnumerator.get_current();
                var wrapper = new ListItemWrapper(oListItem);

                listItemInfo += "ID: " + wrapper.id() + "<br/>" + "Title: " + wrapper.title() + "<br/>" + "Number: " + oListItem.get_item("Number") + "<br/>";
            }

            resultpanel[0].innerHTML = listItemInfo;
        }

        function error() {
            resultpanel[0].innerHTML = "Request failed: " + arguments[1].get_message();
        }
    }
    StronglyTypedData.Init = Init;

    function AddRowToTheEnd() {
        getDocumentElements();
        var clientContext = SP.ClientContext.get_current();
        var oWebsite = clientContext.get_web();
        var oList = oWebsite.get_lists().getByTitle("StronglyTypedList");

        var itemCreateInfo = new SP.ListItemCreationInformation();

        var newlistitem = oList.addItem(itemCreateInfo);
        var wrapper = new ListItemWrapper(newlistitem);

        wrapper.title(titleinput.value);

        var numvalue = +numberinput.value;
        wrapper._number(numvalue);

        newlistitem.update();

        clientContext.load(newlistitem);

        clientContext.executeQueryAsync(success, error);

        function success() {
            Init();
        }

        function error() {
            m$('div#results')[0].innerHTML = "Request failed: " + arguments[1].get_message();
        }
    }
    StronglyTypedData.AddRowToTheEnd = AddRowToTheEnd;
})(StronglyTypedData || (StronglyTypedData = {}));

//m$.ready(() => {
//    StronglyTypedData.Init();
//    }
//)
SP.SOD.executeFunc("mquery.js", "m$", function () {
    m$.ready(function () {
        StronglyTypedData.Init();
    });
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
        SP.SOD.executeOrDelayUntilScriptLoaded(function () {
            //Enable script with MDS
            RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/Sample_StronglyTypedData/StronglyTypedData.js"), StronglyTypedData.Init);
        }, "sp.js");
    }, "clienttemplates.js");
});
//# sourceMappingURL=StronglyTypedData.js.map
