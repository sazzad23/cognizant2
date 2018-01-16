$(document).ready(function(){
    //Background height fix
//    function backgroundFix(){
//        var getBodyHeight = $('body').height();
//        
//        $('#main').height(getBodyHeight);
//        
//    }
//    backgroundFix(); //call function
//        $(window).resize(function(){
//            
//        setTimeout(function(){
//            backgroundFix(); //call function on window rezize
//        },1000);
//         
//    });
});

var list_items_3a = ["3A1","3A2","3A3","3A4","3A5","3A6"];
var list_items_3b = ["3B1","3B2","3B3","3B4","3B5"];
var list_items_3c = ["3C1","3C2","3C3","3C4"];

var components_3a = ["Medvantage (LS, ALL)",
                     "Smartrials (LS, AVM)",
                     "Adpart (ALL, QEA)",
                     "Bigdecisions (ALL, ALL)",
                     "Life engage (INS, ALL)",
                     "Optimawrite (INS, ALL)"];
var components_3b = ["Codenizant, Cast",
                     "CLM",
                     "Mainspring",
                     "Knowhub, Process space",
                     "BIC, LSS, MI / CSI (ISPACE)"];
var components_3c = ["Strategic client engagement",
                     "AI / Automation",
                     "Mainspring",
                     "Strategic partnerships"];

$("input[class=checkInput]").on('change',function() {
    var item_key = '';
    var value_parts = this.value.split('$');
    //decice item key
    if(value_parts[0] == 'A')
    {
        item_key = list_items_3a[this.id];
    }
    else if(value_parts[0] == 'B')
    {
        item_key = list_items_3b[this.id];
    }
    else if(value_parts[0] == 'C')
    {
        item_key = list_items_3c[this.id];
    }
    //mark or unmark checkbox based on checkbox
    if(this.checked)
    {
        localStorage.setItem(item_key,value_parts[1] );
    }
    else
    {
        localStorage.removeItem(item_key);
    }
    //perform total based on page check
    if(value_parts[0] == 'A')
    {
        doPageTotal(list_items_3a);
    }
    else if(value_parts[0] == 'B')
    {
        doPageTotal(list_items_3b);
    }
    else if(value_parts[0] == 'C')
    {
        doPageTotal(list_items_3c);
    }
    
});
function resetData(list_items)
{
    for(var i = 0; i < list_items.length; i++)
    {
        localStorage.removeItem(list_items[i]);
    }
}
function resetAllData()
{
    resetData(list_items_3a);
    resetData(list_items_3b);
    resetData(list_items_3c);
    console.log('Data is cleared');
}
function markChechBoxes(list_items)
{
    for(var i = 0; i < list_items.length; i++)
    {
        var stored_string = localStorage.getItem(list_items[i]);
        
        if(stored_string != null)
        {
            $("#" + i).prop('checked', true);
        }
    }
}

function doPageTotal(list_items)
{
    var final_data = [0,0];
    for(var i = 0; i < list_items.length; i++)
    {
        var stored_string = localStorage.getItem(list_items[i]);
        if(stored_string != null)
        {
            console.log(stored_string);
            var value_array = stored_string.split(",");
            
            final_data[0] = eval(final_data[0] + "+" + value_array[0]);
            final_data[1] = eval(final_data[1] + "+" + value_array[1]);
        }
    }
    $("#cost").html(final_data[0].toLocaleString('en'));
    $("#rating").html(final_data[1]);
    return final_data;
}

function doFinalTotal()
{
    var final_data_a = doPageTotal(list_items_3a);
    var final_data_b = doPageTotal(list_items_3b);
    var final_data_c = doPageTotal(list_items_3c);
    var final_data = [0,0];
    final_data[0] = eval(final_data_a[0] + "+" + final_data_b[0] + "+" + final_data_c[0] );
    final_data[1] = eval(final_data_a[1] + "+" + final_data_b[1] + "+" + final_data_c[1] );
    
    $("#cost").html(final_data[0].toLocaleString('en'));
    $("#rating").html(final_data[1]);
}

function listComponents(list_items,components,row_id)
{
    var components_titles = "";
    var components_cost = "";
    var components_ratings = "";
    var line_break = "";
    for(var i = 0; i < list_items.length; i++)
    {
        var stored_string = localStorage.getItem(list_items[i]);
        if(stored_string != null)
        {
            var value_array = stored_string.split(",");
            
            components_titles += line_break + components[i];
            components_cost += line_break + eval(value_array[0]).toLocaleString('en');
            components_ratings += line_break + value_array[1];
            
            line_break = "<br>"
        }
    }
    
    $("#"+row_id).find('td:eq(1)').html(components_titles);
    $("#"+row_id).find('td:eq(2)').html(components_cost);
    $("#"+row_id).find('td:eq(3)').html(components_ratings);
}
function listComponentsAndDoFinalTotal()
{
    listComponents(list_items_3a,components_3a,"screenAItems");
    listComponents(list_items_3b,components_3b,"screenBItems");
    listComponents(list_items_3c,components_3c,"screenCItems");
    doFinalTotal();
}
