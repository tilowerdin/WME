

<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta Information-->
    <meta charset="utf-8"/>
    <meta name="author" content="Maximilian Kindt, Tilo Werdin"/>
    <meta name="keywords" content="world data, table, countries"/>
    <meta name="description" content="This is a website that contains some information about countries in the world." />

    <title>World Data Overview</title>

    <!-- Import of external style sheets and fonts-->
    <link rel="stylesheet" href="https://github.com/murtaugh/HTML5-Reset/blob/master/assets/css/reset.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">

    <link rel="stylesheet" type="text/css" href="../css/header.css">
    <link rel="stylesheet" type="text/css" href="../css/body.css">
    <link rel="stylesheet" type="text/css" href="../css/table.css">
    <link rel="stylesheet" type="text/css" href="../css/footer.css">

    <!-- Import of Javascript-->
    <script src="../js/table_print.js"></script>
    <script src="../js/navbar.js"></script>

    <!-- required for the page to scale properly inside any screen https://www.hongkiat.com/blog/responsive-web-nav/ -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

</head>
<body onresize="onResize();">
<header class="top-bar">
    <!-- Navigation bar from https://www.hongkiat.com/blog/responsive-web-nav/ -->
    <nav id="navbar" class="clearfix sticky">

        <ul class="clearfix">
            <li><div id="logo" onclick="window.location='../index.html'"></div></li>
            <li id="pull" onclick="toggle_nav_elements();"><div><i class="fas fa-bars"></i></div></li>
            <li class="menu-li"><div class="menu-div"><i class="fas fa-bars"></i> A1 - Table</div></li>
            <li class="menu-li"><div class="menu-div" onclick="window.location='parse.php'"><i class="fas fa-bars"></i> A2 - Parse</div></li>
            <li class="menu-li"><div class="menu-div" onclick="window.location='save.php'"><i class="fas fa-bars"></i> A3 - Save</div></li>
            <li class="menu-li"><div class="menu-div" onclick="window.location='print.php'"><i class="fas fa-bars"></i> A4 - Print</div></li>
            <li class="menu-li"><div class="menu-div"><i class="fas fa-bars"></i> A5 - REST</div></li>
            <li class="menu-li"><div class="menu-div"><i class="fas fa-bars"></i> A6 - Vis</div></li>
        </ul>

    </nav>

</header>

<div class="body">
    <!-- Headline -->
    <h1>
        World Data Overview ...
    </h1>

    <!-- Textbox-->
    <div id="box">
        The demand for good-quality statistical data continues to increase. Timely and reliable statistics are key inputs to the broad development strategy. Improvements in the quality and quantity of data on all aspects of development are essential if we are to achieve the goal of a world without poverty.

        Good data are needed to set baselines, identify effective public and private actions, set goals and targets, monitor progress and evaluate impacts. They are also an essential tool of good government, providing means for people to assess what governments do and helping them to participate directly in the development process.

        At the World Bank, the Development Data Group coordinates statistical and data work and maintains a number of macro, financial and sector databases. Working closely with the Bank's regions and Global Practices, the group is guided by professional standards in the collection, compilation and dissemination of data to ensure that all data users can have confidence in the quality and integrity of the data produced.

        Much of the data comes from the statistical systems of member countries, and the quality of global data depends on how well these national systems perform. The World Bank works to help developing countries improve the capacity, efficiency and effectiveness of national statistical systems. Without better and more comprehensive national data, it is impossible to develop effective policies, monitor the implementation of poverty reduction strategies, or monitor progress towards global goals. <a href="https://data.worldbank.org/about" target="_blank">the world bank</a>
    </div>

    <!-- Enables the hidding of table columns at the top of the table -->
    <div class="showHide">
        Show/Hide: <a href="javascript:show_hide_column(2,true);">birth rate</a>, <a href="javascript:show_hide_column(3,true);">cellphones</a>, <a href="javascript:show_hide_column(4,true);">children / woman</a>, <a href="javascript:show_hide_column(5,true);">electric usage</a>, <a href="javascript:show_hide_column(6,true);">internet usage</a>
    </div>

    <!-- this table is filled with help of the following script -->
    <?php
    /**
     * Created by PhpStorm.
     * User: maximilian
     * Date: 11/12/18
     * Time: 10:15 AM
     */
    include "World_Data_Parser.php";


    $csv = WorldDataParser::parseCSV("../vorlagen/world_data_v1.csv");
    if(WorldDataParser::saveXML($csv)){
        WorldDataParser::printXML("./world_data.xml","../XSLSheets/styleseet.xslt");
    } else {
        echo "ERROR!";
    }
    ?>

    <!-- this script fills the above table -->
    <!--<script>get_table()</script>-->

    <!-- Enables the hidding of table rows at the bottom of the table -->
    <div class="showHide">
        Show/Hide: <a href="javascript:toggle_cols(birth);">birth rate / 100</a>, <a href="javascript:toggle_cols(phones);">cellphones / 100</a>, <a href="javascript:toggle_cols(child);">children / woman</a>, <a href="javascript:toggle_cols(electric);">electric usage</a>, <a href="javascript:toggle_cols(internet);">internet usage</a>
    </div>

</div>


<footer>
    <!-- Left footer with Copyright and course information -->
    <div id="footerLeft">
        Copyright &#9400; 2018 world_data<br>
        First course exercise <b>HTML, CSS and JS</b> of the lecture Web and Multimedia Engineering.
    </div>

    <!-- Right footer with our names and team -->
    <div id="footerRight">
        This solution has been created by:<br>
        Maximilian Kindt, Tilo Werdin, Team 11
    </div>
</footer>
</body>
</html>

