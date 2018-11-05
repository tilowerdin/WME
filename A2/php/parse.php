<?php
/**
 * Created by PhpStorm.
 * User: maximilian
 * Date: 11/5/18
 * Time: 9:49 AM
 */
include "World_Data_Parser.php";

echo "<pre>";
print_r(WorldDataParser::parseCSV("../vorlagen/world_data_v1.csv"));
echo "</pre>";