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