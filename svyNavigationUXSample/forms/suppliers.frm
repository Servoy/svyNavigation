customProperties:"formComponent:false,\
useCssPosition:true",
dataSource:"db:/example_data/suppliers",
encapsulation:60,
items:[
{
cssPosition:"307,-1,-1,550,355,32",
dataProviderID:"postalcode",
formIndex:4,
name:"postalcode",
typeid:4,
uuid:"02B64BA3-D57E-4803-BF46-7ADA449A5D20"
},
{
cssPosition:"267,-1,-1,390,120,32",
formIndex:8,
labelFor:"address",
name:"address_label",
text:"Address",
transparent:true,
typeid:7,
uuid:"10195A9E-5694-4863-B42D-475B574EAF3E"
},
{
cssPosition:"187,-1,-1,550,355,32",
dataProviderID:"country",
formIndex:6,
name:"country",
typeid:4,
uuid:"1AA3C106-8DB4-4C72-BF54-3D6AC3548418"
},
{
cssPosition:"307,-1,-1,390,120,32",
formIndex:5,
labelFor:"postalcode",
name:"postalcode_label",
text:"Postalcode",
transparent:true,
typeid:7,
uuid:"241F1395-421D-4E42-9C16-8B5CF8BDF0CC"
},
{
cssPosition:"107,-1,-1,390,120,32",
formIndex:1,
labelFor:"companyname",
name:"companyname_label",
text:"Company Name",
transparent:true,
typeid:7,
uuid:"3A10E309-B5CB-4AE9-A879-E8DA800EDA54"
},
{
cssPosition:"227,-1,-1,550,355,32",
dataProviderID:"city",
formIndex:2,
name:"city",
typeid:4,
uuid:"3DF743CA-68A2-4490-9F00-CD723C8DA353"
},
{
cssPosition:"147,-1,-1,550,355,32",
dataProviderID:"contactname",
formIndex:3,
name:"contactname",
typeid:4,
uuid:"56C56278-FA33-421C-B0D4-43EA93221686"
},
{
cssPosition:"380,30,30,360,0,0",
json:{
columns:[
{
autoResize:false,
id:"set",
styleClass:"fas fa-retweet",
svyUUID:"374DAAAF-5FDA-452A-A8E9-03F59400088A",
visible:false,
width:40
},
{
autoResize:false,
id:"load-record",
styleClass:"fas fa-truck-loading",
svyUUID:"646F74D5-B819-427B-9562-DD47681D7DB7",
visible:false,
width:40
},
{
autoResize:false,
id:"load",
styleClass:"fas fa-truck-loading text-success",
svyUUID:"5313FDC8-2810-4174-8F0A-E9708B717C1F",
visible:false,
width:40
},
{
autoResize:false,
enableResize:false,
enableRowGroup:false,
enableSort:false,
enableToolPanel:false,
id:"link",
styleClass:"fa fa-arrow-right",
svyUUID:"59FE8C98-C060-47C0-9587-DC3D807B04AA",
width:40
},
{
autoResize:false,
id:"force",
styleClass:"fa fa-arrow-right text-success",
svyUUID:"755876EC-AB19-4EC4-8786-FDE29504DEC1",
visible:false,
width:40
},
{
dataprovider:"productname",
filterType:"TEXT",
headerTitle:"Products",
id:"name",
svyUUID:"BFB917FF-E7F8-410F-893B-55ED86D308C4"
}
],
cssPosition:{
bottom:"30",
height:"0",
left:"360",
right:"30",
top:"380",
width:"0"
},
gridOptions:{
floatingFilter:"true",
floatingFiltersHeight:"40",
headerHeight:"35"
},
myFoundset:{
foundsetSelector:"suppliers_to_products"
},
onCellClick:"3406B6B3-DEEB-4DBB-AD6B-F277F10A9DF3",
rowHeight:35,
styleClass:"ag-theme-servoy",
toolPanelConfig:{
suppressColumnSelectAll:true,
suppressRowGroups:true,
suppressSideButtons:true,
svyUUID:"B0929AD7-DC4A-4C09-B2E3-240F764BA18C"
}
},
name:"tableProducts",
styleClass:"ag-theme-servoy",
typeName:"aggrid-groupingtable",
typeid:47,
uuid:"5855A834-0C8A-4ED4-81B2-D2D40A6A0515"
},
{
cssPosition:"147,-1,-1,390,120,32",
formIndex:12,
labelFor:"contactname",
name:"contactname_label",
text:"Contact Title",
transparent:true,
typeid:7,
uuid:"5DE68B8C-0F42-40DC-BF8F-AD24090166C1"
},
{
cssPosition:"107,-1,-1,550,355,32",
dataProviderID:"companyname",
formIndex:10,
name:"companyname",
typeid:4,
uuid:"655636E6-0AF2-4C8E-8B99-DD5F6894BD22"
},
{
cssPosition:"40,31,-1,361,-1,45",
formIndex:1,
json:{
cssPosition:{
bottom:"-1",
height:"45",
left:"361",
right:"31",
top:"40",
width:"-1"
},
formIndex:1,
styleClass:"padding-left-10 border-bottom text-primary border-primary h2",
text:"Supplier"
},
name:"label",
styleClass:"padding-left-10 border-bottom text-primary border-primary h2",
typeName:"bootstrapcomponents-label",
typeid:47,
uuid:"892C8636-0481-4B77-92FC-B94A8E650EDF"
},
{
cssPosition:"187,-1,-1,390,120,32",
formIndex:9,
labelFor:"country",
name:"country_label",
text:"Country",
transparent:true,
typeid:7,
uuid:"93D7E31B-FDF0-42F8-BC4B-5483695C6EE7"
},
{
height:480,
partType:5,
typeid:19,
uuid:"94B886CA-75C6-4ABF-B9F2-E66A2F0FABB7"
},
{
cssPosition:"267,-1,-1,550,355,32",
dataProviderID:"address",
formIndex:11,
name:"address",
typeid:4,
uuid:"98D0FBFD-D578-4B71-904C-5587B9CA1019"
},
{
cssPosition:"30,30,-1,360,-1,330",
json:{
cssPosition:{
bottom:"-1",
height:"330",
left:"360",
right:"30",
top:"30",
width:"-1"
},
formIndex:0,
styleClass:"box"
},
name:"label_1",
styleClass:"box",
typeName:"bootstrapcomponents-label",
typeid:47,
uuid:"CFF19130-58E0-4B30-9273-F199231BEA20"
},
{
cssPosition:"227,-1,-1,390,120,32",
formIndex:7,
labelFor:"city",
name:"city_label",
text:"City",
transparent:true,
typeid:7,
uuid:"EC6F3A6B-71E9-4721-A5E1-7C895BD7B160"
},
{
cssPosition:"30,-1,30,30,300,0",
json:{
columns:[
{
dataprovider:"companyname",
filterType:"TEXT",
svyUUID:"A57C1BA8-44BD-4AA8-8060-344F1E6C8890"
}
],
cssPosition:{
bottom:"30",
height:"0",
left:"30",
right:"-1",
top:"30",
width:"300"
},
gridOptions:{
floatingFilter:"true",
floatingFiltersHeight:"40",
headerHeight:"10"
},
rowHeight:35,
styleClass:"ag-theme-servoy",
toolPanelConfig:{
suppressColumnSelectAll:true,
suppressRowGroups:true,
suppressSideButtons:true,
svyUUID:"EC80E53E-D6FE-46DB-837E-2732C758A41C"
}
},
name:"table",
styleClass:"ag-theme-servoy",
typeName:"aggrid-groupingtable",
typeid:47,
uuid:"FF32DA20-4A64-461C-875D-FF769F4D0C95"
}
],
name:"suppliers",
navigatorID:"-1",
onHideMethodID:"14F6C236-DC0E-433F-8F0D-7F50C5CEECDF",
onShowMethodID:"D68DAFAD-3233-4055-AEB5-8754C64ABAB5",
showInMenu:true,
size:"1001,480",
styleClass:"bg-tertiary",
typeid:3,
uuid:"3BD29C4E-6C15-4002-AF43-434C28B2EF79"