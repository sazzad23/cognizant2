

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
                     "Strategic partnerships",
                     "Digital Capabilities"];
var final_data = [0,0];
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
        doPageTotalUpto(1);
    }
    else if(value_parts[0] == 'B')
    {
        doPageTotalUpto(2);
    }
    else if(value_parts[0] == 'C')
    {
        doPageTotalUpto(3);
    }
    
});
function resetData(list_items)
{
    for(var i = 0; i < list_items.length; i++)
    {
        localStorage.removeItem(list_items[i]);
    }
    localStorage.removeItem("timer");
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

function doPageTotalUpto(page_number)
{
    var final_data = [0,0];
    
    if(page_number > 0)
    {
        var t_final_data = doPageTotal(list_items_3a);
        final_data[0] = eval(final_data[0] + "+" + t_final_data[0]);
        final_data[1] = eval(final_data[1] + "+" + t_final_data[1]);
        
    }
    
    if(page_number > 1)
    {
        var t_final_data = doPageTotal(list_items_3b);
        final_data[0] = eval(final_data[0] + "+" + t_final_data[0]);
        final_data[1] = eval(final_data[1] + "+" + t_final_data[1]);
        
    }
    
    if(page_number > 2)
    {
        var t_final_data = doPageTotal(list_items_3c);
        final_data[0] = eval(final_data[0] + "+" + t_final_data[0]);
        final_data[1] = eval(final_data[1] + "+" + t_final_data[1]);
        
    }
    
    $("#cost").html(final_data[0].toLocaleString('en'));
    $("#rating").html(final_data[1]);
}

function doFinalTotal()
{
    var final_data_a = doPageTotal(list_items_3a);
    var final_data_b = doPageTotal(list_items_3b);
    var final_data_c = doPageTotal(list_items_3c);
    final_data = [0,0];
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
function evaluateSolution()
{
    var is_for_insurance = localStorage.getItem("option") == "insurance"?true:false;
    if(localStorage.getItem(list_items_3b[0]) == null)
    {
        window.location = "screen_5A.html";
    }
    else if((is_for_insurance && final_data[1] < 23) || (!is_for_insurance && final_data[1] < 21) )
    {
        window.location = "screen_5B.html";
    }
    else if((is_for_insurance && (localStorage.getItem(list_items_3a[3]) == null || localStorage.getItem(list_items_3a[4]) == null))
            ||
            (!is_for_insurance && (localStorage.getItem(list_items_3a[1]) == null || localStorage.getItem(list_items_3a[2]) == null)))
    {
        window.location = "screen_5C.html";
    }
    else if((is_for_insurance && final_data[0] > 150000) || (!is_for_insurance && final_data[0] > 170000) )
    {
        window.location = "screen_5D.html";
    }
    else if((is_for_insurance && final_data[0] <= 150000) || (!is_for_insurance && final_data[0] <= 170000) )
    {
        window.location = "screen_5E.html";
    }
}
function displayInfoParagraph()
{
    var infoText = "";
    if(localStorage.getItem("option") == "life_science")
    {
        infoText = "LIFE SCIENCES customer is looking for project estimates for AUTOMATION TESTING of CLINICAL TRIALS processes. Provide your estimate that ensures a minimum quality rating of 21.";
    }
    else if(localStorage.getItem("option") == "insurance")
    {
        infoText ="INSURANCE customer is looking for project estimates for developing a DIGITAL DECISION SUPPORT SYSTEM application for their SALES FORCE. Provide your estimate that ensures a minimum quality rating of 23.";
    }
    
    $(".info-pop").attr("data-content",infoText);
}
function formatTime(seconds) {
    return [
            //parseInt(seconds / 60 / 60),
            parseInt(seconds / 60 % 60),
            parseInt(seconds % 60)
            ]
    .join(":")
    .replace(/\b(\d)\b/g, "0$1")
}
function startTimer()
{
    showTimeTaken();
    window.setInterval(function(){
        var timer_start = localStorage.getItem("timer") * 1 + 1;
        localStorage.setItem("timer",timer_start);
        $(".timer").html(formatTime(timer_start));
    }, 1000);
}

function showTimeTaken()
{
    $(".timer").html(formatTime(localStorage.getItem("timer") * 1));
}

$(document).ready(function(){
    $('span[data-toggle="popover"]').popover();
    displayInfoParagraph();
    console.log($(".info-pop").attr("data-content"));
});
