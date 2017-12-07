var sqlSentences = [
   "region_city": {
		"sql": "select a.name AS name_region,a.code AS code_region,a.idCountry AS idcountry_region,b.code AS code_city,b.name AS name_city,b.idRegion AS idRegion_city",
		"from": "(region a join city b on a.code = b.idCountry)",
		"where": 
   }
];

module.exports = sqlSentences;