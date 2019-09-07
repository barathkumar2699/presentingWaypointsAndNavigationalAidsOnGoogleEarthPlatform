function isname()
{
var name1=document.getElementById("name").value;
if(name1.length<1)
{
window.alert("Field should be filled");
f1=0;
}
var re=new RegExp("^[0-9]");
if(re.test(name1))
{
window.alert("User name should not start with a digit");
f1=0;
}
}
