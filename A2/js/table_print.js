// ids for columns
const id = 0;
const country = 1;
const birth = 2;
const phones = 3;
const child = 4;
const electric = 5;
const internet = 9;

// list of all possible columns
const defaultCols = [id, country, birth, phones, child, electric, internet];

// actual columns that are supposed to be drawn
var drawCols = [id, country, birth, phones, child, electric, internet];
// false for reversing the table
var growing = true;

function sortTable(growing) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("world_table");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];
            // Check if the two rows should switch place:
            if (growing) {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function show_hide_column(col_no, do_show) {
    var tbl = document.getElementById('world_table');
    console.log(tbl);
    var col = tbl.getElementsByTagName('col')[col_no];
    console.log(col);
    if (col) {
       // col.style.visibility = do_show ? "" : "collapse";
        if (!col.style.visibility.localeCompare("")) {
            col.style.visibility = "collapse";
        } else {
            col.style.visibility = "";
        }
    }


}

function toggle_growing() {
    set_growing(!growing);
}

function set_growing(grow) {
    growing = grow;
    get_table();
}

// toggle the given id in drawCols which contains all columns that are supposed to be drawn
// and make sure that this list is still ordered.
function toggle_cols(id) {
    var result = [];
    var did = false;
    for (xID in drawCols) {
        var x = drawCols[xID];
        if (x < id) {
            result.push(x);
        } else if (x > id) {
            if (!did) {
                result.push(id);
            }
            result.push(x);
            did = true;
        } else {
            did = true;
        }
    }
    if (!did) {
        result.push(id);
    }
    drawCols = result;
    get_table();
}

// add the current table to the document
function get_table() {

    // first remove the table
    var thead = document.getElementById("thead");
    if (thead != null) {
        thead.parentNode.removeChild(thead);
    }
    var tbody = document.getElementById("tbody");
    if (tbody != null) {
        tbody.parentNode.removeChild(tbody);
    }

    // second draw it again
    var table = document.getElementById('table');

    // add the head of the table
    var thead = get_table_head();
    thead.id = "thead";
    table.appendChild(thead);

    // split rows of data
    var data_rows = data.split("\n");

    // sort data as it is supposed to be
    if (!growing) {
        data_rows.reverse();
    }

    // create body of table
    var tbody = document.createElement('tbody');
    tbody.id = "tbody";

    // for each row of the data, create one row for the body of the table
    for (var row in data_rows) {
        var tr = document.createElement('tr');

        var elems = data_rows[row].split(",");

        // check the coloumns that are supposed to be drawn and create cell for each of them
        for (colID in drawCols) {
            var col = drawCols[colID];
            var td_id = document.createElement('td');
            var text_id = document.createTextNode(clean(elems[col]));

            td_id.appendChild(text_id);
            tr.appendChild(td_id);
        }

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
}

// create the head of the table
function get_table_head() {
    // create one table row that is going to be the table head
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');

    // for each default coloumn, check if this column is supposed to be drawn
    for (var colID in defaultCols) {
        if (colID in drawCols) {
            // draw each column that is supposed to be drawn
            var col = drawCols[colID];
            var th = document.createElement('th');
            switch (col) {
                case id:
                    th.appendChild(document.createTextNode('ID'));
                    break;
                case country:
                    th.appendChild(document.createTextNode('Country '));

                    // add functions to the font awesome items
                    var up_link = document.createElement('a');
                    up_link.href = "javascript:set_growing(true);";
                    var arrow_up = document.createElement('i');
                    arrow_up.className = "fas fa-angle-up";
                    up_link.appendChild(arrow_up);
                    th.appendChild(up_link);

                    var down_link = document.createElement('a');
                    down_link.href = "javascript:set_growing(false);";
                    var arrow_down = document.createElement('i');
                    arrow_down.className = "fas fa-angle-down";
                    down_link.appendChild(arrow_down);
                    th.appendChild(down_link);

                    break;
                case birth:
                    th.appendChild(document.createTextNode('birth rate / 100'));
                    break;
                case phones:
                    th.appendChild(document.createTextNode('cellphones / 100'));
                    break;
                case child:
                    th.appendChild(document.createTextNode('children / woman'));
                    break;
                case electric:
                    th.appendChild(document.createTextNode('electric usage'));
                    break;
                case internet:
                    th.appendChild(document.createTextNode('internet usage'));
                    break;
                default:
                    th.appendChild(document.createTextNode('ERROR: column id ' + id + ' does not exist.'));
            }
            tr.appendChild(th);
        }
    }
    thead.appendChild(tr);
    return thead;
}

// remove " " from the beginning and end of the string
function clean(str) {
    var start = 0;
    while (str[start] == " ") {
        start++;
    }
    var end = str.length - 1;
    while (str[end] == " ") {
        end--;
    }
    end++;
    return str.slice(start, end);
}

// table data
var data = "001,Brazil              ,16.405             ,90.01936334        ,1.862             ,2201.808724                       ,4424.758692   ,-1.520402823         ,8.228535058     ,39.22                ,74             ,1.615173655                        ,-14.235004000,-51.925280000\n\
002,Canada              ,10.625             ,70.70997244        ,1.668             ,15119.76414                       ,25069.86915   ,-3.953353186         ,2.944408564     ,80.17086651          ,80.9           ,1.415710422                        ,56.130366000 ,-106.346771000\n\
003,Chile               ,15.04              ,97.01862561        ,1.873             ,3276.06449                        ,6451.631126   ,-2.610485847         ,7.47050527      ,38.8                 ,78.8           ,3.064076139                        ,-35.675147000,71.542969000\n\
004,China               ,13.536             ,55.97490921        ,1.642             ,2632.724637                       ,2208.403948   ,8.648414427          ,6.684109668     ,28.97659939          ,75.6           ,2.24110794                         ,35.86166000  ,104.19539700\n\
005,Colombia            ,20.605             ,92.34584564        ,2.405             ,1041.994137                       ,3137.695335   ,0.2081538559         ,3.666941163     ,30                   ,75.3           ,3.833780372                        ,4.570868000  ,-74.297333000\n\
006,Ecuador             ,20.989             ,92.84925653        ,2.69              ,1078.038961                       ,1692.067197   ,-1.079538461         ,7.595866872     ,24.6                 ,74.1           ,3.746501879                        ,-1.831239000 ,-78.183406000\n\
007,Egypt               ,24.83              ,69.43661504        ,2.919             ,1607.918763                       ,1911.964501   ,2.856917581          ,10.10750976     ,24.28                ,70.2           ,2.137305699                        ,26.820553000 ,30.802498000\n\
008,Finland             ,11.127             ,144.1530224        ,1.86              ,15241.61194                       ,26205.68832   ,-8.791558776         ,0.4277308694    ,82.53133098          ,79.7           ,1.501872268                        ,61.924110000 ,25.748151000\n\
009,France              ,12.21              ,95.44434226        ,1.978             ,7339.946832                       ,22508.76261   ,-3.264056248         ,1.050366124     ,69.0633593           ,81             ,2.55313249                         ,46.22763800  ,2.21374900\n\
010,Germany             ,8.136              ,127.4188883        ,1.376             ,6753.05764                        ,24368.19561   ,-4.886323581         ,0.5959234322    ,79.48523153          ,80             ,1.438871341                        ,51.165691000 ,10.451526000\n\
011,Iceland             ,14.738             ,107.6604456        ,2.123             ,51259.18763                       ,35310.97441   ,-6.990418561         ,6.900703626     ,92.13686385          ,82.2           ,0.0820538039                       ,64.9630510000,-19.0208350000\n\
012,Iraq                ,31.585             ,65.47478839        ,4.276             ,1086.323768                       ,752.1833548   ,1.141874289          ,25.22442136     ,1.047516616          ,68.1           ,4.621383386                        ,33.223191000 ,43.679291000\n\
013,Japan               ,8.201              ,91.8955442         ,1.359             ,7838.005685                       ,38242.02429   ,-6.180260885         ,-2.08543109     ,77.38468963          ,82.8           ,1.019445017                        ,36.204824000 ,138.252924000\n\
014,Kazakhstan          ,19.775             ,107.7147692        ,2.537             ,4447.142293                       ,2345.86415    ,-1.437812068         ,19.5422854      ,17.91457965          ,66.6           ,1.105385125                        ,48.019573000 ,66.923684000\n\
015,Mexico              ,19.091             ,74.25785259        ,2.313             ,1869.82352                        ,5875.619997   ,-7.417438847         ,4.033645258     ,26.34                ,75.5           ,0.5396656609                       ,23.6345010000,-102.5527840000\n\
016,New Zealand         ,13.831             ,108.7301521        ,2.125             ,9375.550304                       ,14778.16393   ,-1.552308788         ,3.486782259     ,79.82609287          ,80.3           ,1.140562366                        ,-40.900557000,174.885971000\n\
017,Nigeria             ,40.134             ,48.23561006        ,6.021             ,119.8151486                       ,513.5003377   ,4.3526073            ,9.313146383     ,20                   ,58.5           ,0.8924302789                       ,9.0819990000 ,8.6752770000\n\
018,Peru                ,21.342             ,85.86901405        ,2.545             ,1043.052601                       ,2955.186222   ,-0.2228977721        ,4.49134447      ,31.4                 ,76.7           ,1.348875763                        ,-9.189967000 ,-75.015152000\n\
019,Russia              ,10.828             ,161.1162887        ,1.537             ,6132.978648                       ,2806.41483    ,-7.749103694         ,11.60398093     ,29.23584146          ,68.3           ,4.36259042                         ,61.52401000  ,105.31875600\n\
020,Saudi Arabia        ,23.569             ,167.3474553        ,2.898             ,7430.743897                       ,9294.355996   ,-2.242127204         ,14.36222827     ,38                   ,77.6           ,10.95653405                        ,23.88594200  ,45.07916200\n\
021,South Africa        ,22.113             ,93.33587369        ,2.5               ,4532.021902                       ,3697.67368    ,-2.732989408         ,7.861608575     ,10.08745979          ,55.8           ,1.394530379                        ,-30.559482000,22.937506000\n\
022,Sweden              ,11.72              ,112.1241184        ,1.937             ,14143.01101                       ,30885.45914   ,-5.976535294         ,1.022227082     ,91.12326108          ,81.2           ,1.247701873                        ,60.128161000 ,18.643501000\n\
023,United Arab Emirates,14.027             ,153.7997194        ,1.903             ,9998.291079                       ,22507.00157   ,-11.99171952         ,8.549032358     ,64                   ,76.1           ,5.834881976                        ,23.424076000 ,53.847818000\n\
024,United Kingdom      ,12.195             ,130.1742603        ,1.89              ,5685.635995                       ,27933.77767   ,-5.019251823         ,2.861406642     ,77.79971962          ,79.7           ,2.667209048                        ,52.355517700 ,-1.174319700\n\
025,United States       ,14.191             ,89.14911634        ,2.002             ,12913.71143                       ,36539.22823   ,-4.342271218         ,1.152326348     ,71.21181627          ,78.3           ,4.822730027                        ,37.090240000 ,-95.712891000"