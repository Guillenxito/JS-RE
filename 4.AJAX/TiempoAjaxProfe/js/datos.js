const ciudades_csv = `Nombre;País;id
;;
Madrid; España; ES-28-001
Londres; Gran Bretaña; GB-25-001
París;Francia;FR-28-001
Toledo;España;ES-45-001
Valencia;España;ES-46-001
Toledo;Estados Unidos;EU-55-008
;Estados Unidos;EU-55-008
T;Estados Unidos;EU-55-008
Toledo;eSTADOS;EU-55-008`;


const datos_json = [
  {
    "id": "ES-28-001", "temps" : [
      {"fecha" : "2019-03-06", "temp_min": 1.6, "temp_max": 13.5, "cielo": "Soleado"},
      {"fecha" : "2019-03-07", "temp_min": 2.6, "temp_max": 16.0, "cielo": "Soleado"},
      {"fecha" : "2019-03-08", "temp_min": 1.0, "temp_max": 14.8, "cielo": "Soleado"}
      ]    
    },
  {
    "id": "GB-25-001", "temps" : [
      {"fecha" : "2019-03-04", "temp_min": -1.6, "temp_max": 10.5, "cielo": "Cubierto"},
      {"fecha" : "2019-03-05", "temp_min": -3.0, "temp_max": 9.3, "cielo": "Cubierto"},
      {"fecha" : "2019-03-06", "temp_min": -2.1, "temp_max": 11.7, "cielo": "Cubierto"}
    ]
  },
  {
    "id": "ES-45-001", "temps" : [
      {"fecha" : "2019-03-02", "temp_min": 1, "temp_max": 12.5, "cielo": "Nublado"},
      {"fecha" : "2019-03-06", "temp_min": 2, "temp_max": 13.4, "cielo": "Nublado"},
      {"fecha" : "2019-03-07", "temp_min": 1, "temp_max": 14.3, "cielo": "Nublado"}
    ]
  },
  {
    "id": "ES-01-001", "temps" : [
      {"fecha" : "2019-03-05", "temp_min": 1, "temp_max": 14.1, "cielo": "Soleado"},
      {"fecha" : "2019-03-06", "temp_min": 2, "temp_max": 13.8, "cielo": "Soleado"},
      {"fecha" : "2019-03-07", "temp_min": 1, "temp_max": 14.2, "cielo": "Soleado"}
    ]
  },
  {
    "id": "FR-28-001" , "temps" : [
      {"fecha" : "2019-03-04", "temp_min": 2.5, "temp_max": 8.9, "cielo": "Chubascos"},
      {"fecha" : "2019-03-05", "temp_min": 2.6, "temp_max": 9.2, "cielo": "Chubascos"},
      {"fecha" : "2019-03-06", "temp_min": 2.9, "temp_max": 9.6, "cielo": "Chubascos"}
    ]
  },
  {
    "id": "ES-46-001" , "temps" : [
      {"fecha" : "2019-03-07", "temp_min": 5, "temp_max": 19.5,  "cielo": "Soleado"},
      {"fecha" : "2019-03-08", "temp_min": 7, "temp_max": 21.4,  "cielo": "Soleado"},
      {"fecha" : "2019-03-09", "temp_min": 6, "temp_max": 19.1,  "cielo": "Soleado"}
    ]
  },
  {
    "id": "EU-55-008" , "temps" : [
      {"fecha" : "2019-03-05", "temp_min": 3.2, "temp_max": 9.8, "cielo": "Tormentas"},
      {"fecha" : "2019-03-06", "temp_min": 3.5, "temp_max": 9.8, "cielo": "Tormentas"},
      {"fecha" : "2019-03-07", "temp_min": 3.9, "temp_max": 9.8, "cielo": "Tormentas"}
    ]
  }              
];