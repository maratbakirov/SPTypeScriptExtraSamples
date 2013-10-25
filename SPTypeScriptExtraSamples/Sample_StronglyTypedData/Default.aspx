<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="SP.js" runat="server" OnDemand="false" Localizable="false" LoadAfterUI="true" />
    <SharePoint:ScriptLink Name="mquery.js" runat="server" OnDemand="false" Localizable="false" LoadAfterUI="true" />

-    <script type="text/javascript" src="StronglyTypedData.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    Strongly Typed Data Sample

    <div id="root">
        <div id="results">
            Loading data from service...
        </div>

        <div id="1"> Add more data. </div>
        <table>
            <thead>
                <tr>
                <th>Title</th>
                <th>Number</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input id="title" type="text"/></td>
                    <td><input id="number" type="text"/></td>
                </tr>
            </tbody>
        </table>
        <input id="addrow" onclick="StronglyTypedData.AddRowToTheEnd()" type="button" value="Add a row"/>
    </div>


</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    SharePoint accessing data in a strongly typed way
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
    SharePoint accessing data in a strongly typed way
</asp:Content>