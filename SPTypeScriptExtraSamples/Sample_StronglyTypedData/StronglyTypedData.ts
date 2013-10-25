///<reference path="../Scripts/Typings/Sharepoint//SharePoint.d.ts" />

module StronglyTypedData {

    export class ListItemWrapper {
        constructor(private listitem: SP.ListItem) {
        }
        //private title: string;

        // this works for ecmascript and higher
        //set title(value: string) {
        //}

        //get title(): string {
        //}
        public id(): number {
            return this.listitem.get_id();
        }

        getOrSetAnyValue<T>(propertyname: string, value?: T): T {
            if (!(typeof (value) === "undefined")) {
                this.listitem.set_item(propertyname, value);
            }
            return this.listitem.get_item(propertyname);
        }

        public title(value?: string): string {
            return this.getOrSetAnyValue("Title", value);
        }

        public _number(value?: number): number {
            return this.getOrSetAnyValue("Number", value);
        }

    }


    var resultpanel: MQueryResultSetElements;
    var collListItem: SP.ListItemCollection;
    var titleinput: HTMLInputElement;
    var numberinput: HTMLInputElement;

    function getDocumentElements() {
        resultpanel = m$('div#results');
        titleinput = <HTMLInputElement> (m$('input#title')[0]);
        numberinput = <HTMLInputElement> (m$('input#number')[0]);
    }


        
    export function  Init() {
            getDocumentElements();

            var clientContext = SP.ClientContext.get_current();
            var oWebsite = clientContext.get_web();
            var oList = oWebsite.get_lists().getByTitle("StronglyTypedList");
            var camlQuery = new SP.CamlQuery();
            camlQuery.set_viewXml(
                '<View><Query></Query>' +
                '<RowLimit>10</RowLimit></View>'
                );
            collListItem = oList.getItems(camlQuery);

            clientContext.load(collListItem);
            clientContext.executeQueryAsync(
                success,
                error
                );


            function success() {

                var listItemEnumerator = collListItem.getEnumerator();

                var listItemInfo = "";
                while (listItemEnumerator.moveNext()) {
                    var oListItem = listItemEnumerator.get_current();
                    var wrapper = new ListItemWrapper(oListItem);

                    listItemInfo += "ID: " + wrapper.id() + "<br/>" +
                    "Title: " + wrapper.title() + "<br/>" +
                    "Number: " + oListItem.get_item("Number") + "<br/>";
                }

                resultpanel[0].innerHTML = listItemInfo;
            }

            function error() {
                resultpanel[0].innerHTML = "Request failed: " + arguments[1].get_message();
            }
        } // init

    export function  AddRowToTheEnd() {
            getDocumentElements();
            var clientContext = SP.ClientContext.get_current();
            var oWebsite = clientContext.get_web();
            var oList = oWebsite.get_lists().getByTitle("StronglyTypedList");


            var itemCreateInfo = new SP.ListItemCreationInformation();

            var newlistitem: SP.ListItem = oList.addItem(itemCreateInfo);
            var wrapper = new ListItemWrapper(newlistitem);


            wrapper.title(titleinput.value);

            var numvalue:number = +numberinput.value;
            wrapper._number(numvalue);

            newlistitem.update();

            clientContext.load(newlistitem);

            clientContext.executeQueryAsync(
                success,
                error
                );

            function success() {
                Init();
            }

            function error() {
                m$('div#results')[0].innerHTML = "Request failed: " + arguments[1].get_message();
            }

        } // addrow

} // module



//m$.ready(() => {
//    StronglyTypedData.Init();
//    }
//)

SP.SOD.executeFunc("mquery.js", "m$", function(){
    m$.ready(() => {
        StronglyTypedData.Init();
        }
    )
    SP.SOD.executeOrDelayUntilScriptLoaded(function () {
     SP.SOD.executeOrDelayUntilScriptLoaded(function () {
         //Enable script with MDS
         RegisterModuleInit(SPClientTemplates.Utility.ReplaceUrlTokens("~site/Sample_StronglyTypedData/StronglyTypedData.js"), StronglyTypedData.Init);
     }, "sp.js");
    }, "clienttemplates.js");
});

