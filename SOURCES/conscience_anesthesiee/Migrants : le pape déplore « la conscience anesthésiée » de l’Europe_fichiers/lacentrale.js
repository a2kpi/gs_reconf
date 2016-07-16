define(function(){var init,fill_model,decode,Tdata;init=function(selector){var form=document.getElementById(selector),brand_select=form.brand,model_select=form.model;if(brand_select.addEventListener)brand_select.addEventListener("change",function(){fill_model(brand_select,model_select)},true);else if(brand_select.attachEvent)brand_select.attachEvent("onchange",function(){fill_model(brand_select,model_select)})};fill_model=function(brand_select,model_select){var brand=brand_select.value,i,j;while((i=
model_select.options.length)>0)model_select.options[i-1]=null;model_select.options[0]=new Option("Mod\u00e8le");if(Tdata[brand]===undefined)return false;for(i=0,j=Tdata[brand].length;i<j;i++)model_select.options[i+1]=new Option(decode(Tdata[brand][i]),Tdata[brand][i])};decode=function(the_string){return the_string.replace(/\*/g,"/").replace(/~/g,"+").replace(/`/g,"'").replace(/_/g,"-").replace(/\u00a7/g,"&")};Tdata={"ABARTH":["500","GRANDE PUNTO"],"AC":["COBRA","ROADSTER ACE","SHELBY COBRA"],"ACREA":["ZEST"],
"AIXAM":["400","400 SL","500","A540","A721","A741","A751","CITY","CROSSLINE","MINIVAN","ROADLINE","SCOUTY"],"ALFA ROMEO":["146","147","155","156","159","164","166","33","500_4","75","8C","ALFASUD","BRERA","GIULIA","GT","GTV","JULLIA","MITO","RZ","SPIDER","SPRINT"],"ALPINA":["B5","B6","D3"],"ALPINE RENAULT":["A310","A610","ALPINE","GTA"],"ARO":["10.5"],"ASTON MARTIN":["DB4","DB6","DB7","DB9","DBS","RAPIDE","V12 VANTAGE","V8","V8 VANTAGE","VANQUISH","VANTAGE"],"AUDI":["100","200","80","90","A2","A3",
"A4","A4 ALLROAD","A5","A6","A6 ALLROAD","A8","ALLROAD","COUPE","COUPE GT","Q5","Q7","QUATTRO","R8","RS4","RS5","RS6","S3","S4","S5","S6","S8","TT","TT RS","TTS","V8"],"AUSTIN":["1100","1300","A60","METRO","MINI","MINI_MOKE"],"AUSTIN HEALEY":["100","3000","SPRITE"],"AUTO UNION":["1000"],"AUTOBIANCHI":["A112","LUTECE","Y10"],"BELLIER":["DOCKER","JADE","OPALE"],"BENTLEY":["ARNAGE","AZURE","BROOKLANDS","CONTINENTAL","EIGHT","MULSANNE","S2","S3","T","TURBO R"],"BERTONE":["FREECLIMBER"],"BMW":["1600",
"1802","2.5","3.0","3.3","650","COUPE 635","COUPE M635","SERIE 1","SERIE 3","SERIE 5","SERIE 5 GT","SERIE 6","SERIE 7","SERIE 8","X1","X3","X5","X6","Z1","Z3","Z4","Z8"],"BUGATTI":["VEYRON"],"BUICK":["LIMITED","PARK AVENUE","RIVIERA"],"CADILLAC":["BLS","COUPE DEVILLE","CTS","DEVILLE","ELDORADO","ESCALADE","LA SALLE","LIMOUSINE LINCOLN","SERIE 65","SEVILLE","SRX","STS","XLR"],"CARVER":["ONE"],"CASALINI":["SULKY"],"CATERHAM":["SUPER SEVEN"],"CHATENET":["BAROODEUR","CH 26","CH26","SPEEDINO","VOITURETTE"],
"CHEVROLET":["ALERO","AVALANCHE","AVEO","BEL AIR","BLAZER","C10","CALLAWAY","CAMARO","CAPTIVA","CHEVELLE","CORSICA","CORVETTE","CRUZE","EPICA","EVANDA","EXPRESS","FLEETLINE","HHR","IMPALA","KALOS","LACETTI","MATIZ","NUBIRA","ONE_FIFTY","PICK UP","RAMCHARGER","REZZO","SILVERADO","SPARK","SSR","SUBURBAN","TACUMA","TAHOE","TRAILBLAZER","TRANS SPORT"],"CHRYSLER":["300 C","300 M","CROSSFIRE","GRAND VOYAGER","LEBARON","NEON","PT CRUISER","SEBRING","STRATUS","VIPER","VOYAGER","WINDSOR"],"CITROEN":["2CV",
"ACADIANE","AX","BERLINGO","BX","C_CROSSER","C1","C2","C25","C3","C3 COLLECTION","C3 PICASSO","C3 PLURIEL","C4","C4 GRAND PICASSO","C4 PICASSO","C5","C6","C8","CX","DS","DS3","DYANE","EVASION","GRAND C4 PICASSO","GS","GSA","JUMPER","JUMPY","LN","MEHARI","NEMO","PICASSO","SAXO","SM","TRACTION","VISA","XANTIA","XM","XSARA","ZX"],"CORVETTE":["C6","Z06","ZR1"],"DACIA":["DUSTER","LOGAN","SANDERO","STEPWAY"],"DAEWOO":["ESPERO","EVANDA","KALOS","KORANDO","LACETTI","LANOS","LEGANZA","MATIZ","MUSSO","NEXIA",
"NUBIRA","REXTON","REZZO"],"DAIHATSU":["COPEN","CUORE","FEROZA","MATERIA","MOVE","SIRION","TERIOS","TREVIS","YRV"],"DAIMLER":["DOUBLE SIX","SOVEREIGN","V8","XJ6"],"DANGEL":["PARTNER"],"DARMONT":["V","V JUNIOR"],"DATSUN":["120","260 Z","COUPE"],"DE LOREAN":["DMC 12"],"DODGE":["AVENGER","CALIBER","CHALLENGER","CHARGER","DAKOTA","DURANGO","JOURNEY","MAGNUM","NITRO","RAM","VIPER","WAYFARER"],"ERAD":["VOITURETTE"],"FERRARI":["250","308","328","348","360","365","400","456","458","512","512 BB","550","575",
"575 M","599","612","CALIFORNIA","DINO","ENZO","F355","F40","F430","MONDIAL","TESTAROSSA"],"FIAT":["124","126","128","500","600","BARCHETTA","BRAVA","BRAVO","CINQUECENTO","COUPE","CROMA","DOBLO","DUCATO","FIORINO","FIORINO QUBO","GRANDE PUNTO","IDEA","LINEA","MAREA","MULTIPLA","PALIO","PANDA","PUNTO","PUNTO EVO","QUBO","SCUDO","SEDICI","SEICENTO","STILO","TEMPRA","TIPO","ULYSSE","UNO","X1*9|49'"],"FORD":["26 M","CLIPPER","CORTINA","COUGAR","COURRIER","ESCORT","EXPLORER","F_150","F1","F150","FIESTA",
"FOCUS","FOCUS C_MAX","FUSION","GALAXY","GRANADA","GT40","KA","KUGA","MAVERICK","MONDEO","MUSTANG","ORION","PROBE","PUMA","RANGER","S_MAX","SCORPIO","SIERRA","TAUNUS","TOURNEO","TOURNEO CONNECT","TRANSIT","ZEPHYR"],"FORD USA":["AEROSTAR","BRONCO","COBRA","ECONOLINE","EXPEDITION","EXPLORER","F_150","F150","F150 RAPTOR","F250","FLEX","GRANDE","GT","MUSTANG","RANGER","THUNDERBIRD","TORINO"],"GMC":["DENALI","JIMMY","SIERRA","YUKON"],"GRANDIN":["DALLAS"],"GRECAV":["EKE","EPUC","PK500","SONIQUE"],"HOMMELL":["BERLINETTE"],
"HONDA":["ACCORD","CIVIC","CONCERTO","CR_V","CRX","FR_V","HR_V","INSIGHT","JAZZ","LEGEND","LOGO","NSX","PRELUDE","RIDGELINE","S2000","S800","SHUTTLE"],"HUMMER":["H1","H2","H2 SUV","H3","H3T"],"HYUNDAI":["ACCENT","ATOS","ATOS PRIME","AZERA","COUPE","ELANTRA","GALLOPER","GETZ","I10","I20","I30","IX35","IX55","LANTRA","MATRIX","PONY","SANTA FE","SATELLITE","SCOUPE","SONATA","TERRACAN","TRAJET","TUCSON","XG"],"INFINITI":["EX","FX","G"],"INNOCENTI":["MINI"],"INTERNATIONAL":["SCOUT"],"ISUZU":["D_MAX","TROOPER"],
"JAGUAR":["240","420","COUPE TYPE E","DAIMLER","MK II","MK X","ROADSTER XK","S_TYPE","TYPE E","X_TYPE","XF","XJ","XJ12","XJ220","XJ6","XJ8","XJR","XJR_S","XJS","XJS_C","XK","XK8","XKR"],"JDM SIMPA":["ABACA","ALOES"],"JEEP":["CHEROKEE","COMMANDER","COMPASS","FORD","GRAND CHEROKEE","GRAND WAGONEER","HOTCHKISS","PATRIOT","WILLLYS","WILLYS","WRANGLER"],"JENSEN":["HEALEY"],"KIA":["CARENS","CARNIVAL","CEE D","CERATO","CLARUS","MAGENTIS","OPIRUS","PICANTO","PRIDE","PRO CEE D","RIO","SEPHIA","SHUMA","SORENTO",
"SOUL","SPORTAGE","VENGA"],"KTM":["X_BOW"],"LADA":["111","112","KALINA","KALINKA","NIVA","PRIORA"],"LAMBORGHINI":["COUNTACH","DIABLO","ESPADA","GALLARDO","LM","MIURA","MURCIELAGO","REVENTON"],"LANCIA":["BETA","DEDRA","DELTA","FLAVIA","FULVIA","KAPPA","LYBRA","MUSA","PHEDRA","THEMA","THESIS","Y","Y10","YPSILON","ZETA"],"LAND ROVER":["DEFENDER","DISCOVERY","FREELANDER","RANGE","RANGE ROVER","RANGE ROVER SPORT"],"LANTANA":["BUGGY","M800I","IS","LS","RX","SC"],"LEXUS":["CT","GS","IS","LFA","LS","LX",
"RX","SC"],"LIGIER":["AMBRA","BE","BE UP","NOVA","NOVA 500","OPTIMA","OPTIMAX","X_PRO","X_TOO","X_TOO II","X_TOO MAX","X_TOO R","X_TOO S"],"LINCOLN":["CONTINENTAL","NAVIGATOR","TOWN CAR","VERSAILLES"],"LOTUS":["2 ELEVEN","340 R","ELAN","ELISE","ESPRIT","EUROPA","EVORA","EXIGE","MARK VI"],"MAHINDRA":["CJ","GOA"],"MARCOS":["1600","228","3200 GT","4200","COUPE","GHIBLI","GRANCABRIO","GRANSPORT","GRANTURISMO","MERAK","QUATTROPORTE","SPYDER"],"MATRA":["MURENA","BERLINE"],"MAZDA":["2","323","5","6","626",
"BT_50","CX_7","CX_9","CX9","DEMIO","MPV","MX3","MX5","MX6","PICK UP","PREMACY","RX_7","RX_8","TRIBUTE","XEDOS 6","XEDOS 9"],"MAZERATI":["222","3200 GT","BITURBO","COUPE","GHIBLI","GRANCABRIO","GRANSPORT","GRANTURISMO","GRANTURISMO SPORT","KARIF","QUATTROPORTE","SPYDER"],"MAYBACH":["57 BERLINE","62 BERLINE"],"MEGA":["CLUB","CONCEPT"],"MERCEDES":["180","190","200","220","220 COUPE","230","230 CABRIOLET","230 COUPE","240","250","250 CABRIOLET","250 COUPE","260","280","280 COUPE","300","300 COUPE","320",
"350","350 CABRIOLET","350 COUPE","380","450","450 CABRIOLET","500","500 CABRIOLET","560","600","CAB 230","CAB 350","CL","CLASSE A","CLASSE B","CLASSE C","CLASSE CLC","CLASSE CLS","CLASSE E","CLASSE G","CLASSE GL","CLASSE GLK","CLASSE M","CLASSE R","CLASSE S","CLASSE V","CLC","CLK","COUPE","SL","SLK","SLR","SLS","SPRINTER","VANEO","VIANO","VITO"],"MERCURY":["COUGAR"],"MG":["1300","A","B","C","F","M","MIDGET","RV8","TD","TF","ZR","ZS","ZT"],"MICROCAR":["LYRA","M.GO","MC CARGO","MC1","MC2","MC2.2",
"MICROCAR","VIRGO","VIRGO III"],"MINI":["MINI"],"MITSUBISHI":["3000 GT","CARISMA","COLT","ECLIPSE","GRANDIS","L 200","LANCER","MONTERO","OUTLANDER","PAJERO","PAJERO PININ","PAJERO SPORT","SPACE STAR","SPACE WAGON"],"MORGAN":["~ 4","4*4","AERO 8","AEROMAX","PLUS 4","PLUS 6","PLUS 8"],"MORRIS":["MINI COOPER"],"NASH":["LA FAYETTE","SUPER"],"NISSAN":["100 NX","200 SX","300 ZX","350Z","370Z","ALMERA","ALMERA TINO","CUBE","GT_R","INFINITY FX35","INTERSTAR","KING CAB","MAXIMA","MICRA","MURANO","NAVARA",
"NAVARA PICK UP","NOTE","PATHFINDER","PATROL","PICK UP","PIXO","PRIMASTAR","PRIMERA","QASHQAI","QASHQAI ~2","SERENA","SUNNY","TERRANO","TITAN","VANETTE","X_TRAIL"],"OLDSMOBILE":["CUTLASS"],"OPEL":["AGILA","ANTARA","ASCONA","ASTRA","CALIBRA","COMBO","COMMODORE","CORSA","FRONTERA","GT","INSIGNIA","KADETT","MANTA","MERIVA","MONTEREY","MOVANO","OMEGA","SIGNUM","SINTRA","SPEEDSTER","TIGRA","VECTRA","VIVARO","ZAFIRA"],"PANTHER":["LIMA"],"PEUGEOT":["1007","104","106","107","203","204","205","206","206~",
"207","3008","304","305","306","307","308","309","4007","403","404","405","406","407","5008","504","505","604","605","607","806","807","BIPPER TEPEE","BOXER","EXPERT","EXPERT TEPEE","J5","P4","PARTNER","PARTNER TEPEE","RCZ"],"PGO":["356 CLASSIC","CEVENNES","COBRA","SPEEDSTER"],"PIAGGIO":["M500"],"PLYMOUTH":["BARRACUDA","PROWLER"],"POLSKI":["125"],"PONTIAC":["FIREBIRD","GRAND PRIX","SOLSTICE","STARCHIEF","TRANS AM","TRANS SPORT"],"PORSCHE":["356","550","911","912","914","924","928","930","944","959",
"968","BOXSTER","CARRERA GT","CAYENNE","CAYMAN","PANAMERA"],"RENAULT":["4CV","4L","AVANTIME","CARAVELLE","CLIO","ESPACE","EXPRESS","FLUENCE","FUEGO","GRAND ESPACE","GRAND MODUS","GRAND SCENIC","KANGOO","KOLEOS","LAGUNA","MASTER","MEGANE","MODUS","R10","R11","R12","R16","R19","R21","R25","R4","R5","R6","R8","R9","RODEO","SAFRANE","SCENIC","SPIDER","SUPER 5","TRAFIC","TWINGO","VEL SATIS"],"ROLLS ROYCE":["CORNICHE","PHANTOM","SILVER CLOUD","SILVER DAWN","SILVER SHADOW","SILVER SPIRIT","SILVER SPUR",
"SILVER WRAITH"],"ROVER":["25","45","75","MINI","P5","P6","SERIE 100","SERIE 200","SERIE 400","SERIE 600","SERIE 800","STREETWISE"],"SAAB":["9_3","9_3X","9_5","900","9000","93","95","99"],"SANTANA":["PS10","S350","S410","SAMURAI","VITARA"],"SEAT":["ALHAMBRA","ALTEA","ALTEA FREETRACK","AROSA","CORDOBA","EXEO","IBIZA","INCA","LEON","MARBELLA","TOLEDO"],"SECMA":["FUN FAMILY"],"SIMCA":["1100","1300","P60"],"SKODA":["FABIA","FAVORIT","FELICIA","OCTAVIA","ROOMSTER","SUPERB","YETI"],"SMART":["CROSSBLADE",
"FORFOUR","FORTWO","ROADSTER","SMART"],"SPECTRE":["R42"],"SSANGYONG":["ACTYON","ACTYON SPORTS","FAMILY","KORANDO","KYRON","MUSSO","REXTON","RODIUS"],"SUBARU":["B9 TRIBECA","FORESTER","IMPREZA","JUSTY","LEGACY","OUTBACK","SVX","TRIBECA"],"SUZUKI":["ALTO","BALENO","GRAND VITARA","GRAND VITARA XL_7","IGNIS","JIMNY","LIANA","SAMURAI","SPLASH","SWIFT","SX_4","SX4","VITARA","WAGON R~","X90"],"TALBOT SIMCA":["1000","1100","1301","SAMBA"],"TOYOTA":["4RUNNER","AURIS","AVENSIS","AVENSIS VERSO","AYGO","CAMRY",
"CARINA","CARINA E","CELICA","COROLLA","COROLLA VERSO","CORONA","FJ CRUISER","FUN CRUISER","HI ACE","HIGHLANDER","HILUX","IQ","LAND CRUISER","LAND CRUISER SW","LITE ACE","LJ 70","MATRIX","MR","PASEO","PICNIC","PREVIA","PRIUS","RAV 4","RAV4","STARLET","SUPRA","TUNDRA","URBAN CRUISER","VERSO","YARIS","YARIS VERSO"],"TRIUMPH":["GT6","SPITFIRE","TR 3","TR 4","TR 5","TR 6","TR 7"],"TVR":["350 C","CHIMAERA","GRIFFITH","TUSCAN"],"UNIC":["BOULANGERE"],"VENTURI":["COUPE 260"],"VOLKSWAGEN":["1200","1300","1302",
"1303","1600","181","BORA","CADDY","CALIFORNIA","CARAVELLE","COCCINELLE","COCCINELLE CABRIOLET","COMBI","CORRADO","COX","DERBY","EOS","FOX","GOLF","GOLF PLUS","ILTIS","JETTA","KARMAN GHIA","LT COMBI","LUPO","MULTIVAN","NEW BEETLE","PASSAT","PASSAT CC","PHAETON","POLO","SCIROCCO","SHARAN","TIGUAN","TOUAREG","TOURAN","TRANSPORTER","VENTO"],"VOLVO":["122","144","240","340","440","460","480","740","760","850","940","960","C30","C70","S40","S60","S70","S80","S80 LIMOUSINE","V40","V50","V70","XC60","XC70",
"XC90"],"WIESMANN":["GT","ROADSTER"]};return{initFor:init}});
