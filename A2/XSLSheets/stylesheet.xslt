<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>

            <body>
                <!-- Definiere Tabelle fuer Werte-->
                <table id="world_table" >
                    <thead>
                        <!-- Definiere Spalten fuer Verwendung im Javascript -->
                        <colgroup>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                        </colgroup>
                    <tr>
                        <!-- Definiere Spalten inklusive Eigenschaften und Namen fuer das HTML-Dokument -->
                        <th style="text-align:left">ID</th>
                        <th style="text-align:left">Country
                            <a href="javascript:sortTable(true);"><i class="fas fa-angle-up"/> </a>
                            <a href="javascript:sortTable(false);"><i class="fas fa-angle-down"/> </a>
                        </th>
                        <th style="text-align:left">birth rate / 100</th>
                        <th style="text-align:left">cellphones / 100</th>
                        <th style="text-align:left">children / women</th>
                        <th style="text-align:left">electric usage</th>
                        <th style="text-align:left">internet usage</th>
                    </tr>
                    </thead>
                    <tbody>
                        <!-- Erstelle pro Country im XML eine Zeile mit Ensprechenten Spaltenwerten-->
                    <xsl:for-each select="Countries/Country">
                        <tr>
                            <td><xsl:value-of select="id"/></td>
                            <td><xsl:value-of select="name"/></td>
                            <td><xsl:value-of select="birth"/></td>
                            <td><xsl:value-of select="cell"/></td>
                            <td><xsl:value-of select="children"/></td>
                            <td><xsl:value-of select="electricity"/></td>
                            <td><xsl:value-of select="internet"/></td>
                        </tr>
                    </xsl:for-each>
                    </tbody>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>

