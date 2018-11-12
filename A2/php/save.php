<?php
/**
 * Created by PhpStorm.
 * User: maximilian
 * Date: 11/5/18
 * Time: 10:50 AM
 */
include "World_Data_Parser.php";

$csvArray = WorldDataParser::parseCSV("../vorlagen/world_data_v1.csv");
$saveToXMLSuccesfull = WorldDataParser::saveXML($csvArray);

if ($csvArray) {
    echo "XML Speicherstatus: erfolgreich";
} else {
    echo "XML Speicherstatus: nicht erfolgreich";
}