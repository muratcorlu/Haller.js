/*
*
* Haller.js v2.0
* sercaneraslan.com
*
* Kullanımı örnekleri:
* console.log(Hal.ler("sercan","de"));
* console.log(Hal.ler("Murat","iyelik"));
* console.log(Hal.ler("osman","i"));
*/
var Hal = (function( undefined ){
    var sesliHarfler = 'aıeiouöü',
        sertUnsuzler = 'fstkçşhp',
        haller = ['iyelik','i','e','de','den'];

    return {
        ler: function(isim, hal) {
            var harfler = isim.split(''),
                sonHarf = harfler.pop(),
                harf,
                sesliler=[],
                ek,
                code,
                sonSesli;

            while ( (harf = harfler.pop()) !== undefined ) {
                (code = sesliHarfler.indexOf(harf)) > -1 && sesliler.push(code);
            }

            sonSesli = sesliler[0];

            // Ekin sesli harfine karar verelim
            if (hal == haller[0] || hal == haller[1]) {
                ek = (sonSesli == 0 || sonSesli == 1) && 'ı' || // Son sesli harf a veya ı ise
                     (sonSesli == 2 || sonSesli == 3) && 'i' || // Son sesli harf e veya i ise
                     (sonSesli == 4 || sonSesli == 5) && 'u' || // Son sesli harf o veya u ise
                     'ü';   // Son sesli harf ö veya ü ise
            } else {
                ek = (sonSesli == 0 || sonSesli == 1 ||
                        sonSesli == 4 || sonSesli == 5) && 'a' || // Son sesli harf a, ı, o veya u ise
                    'e';  // Son sesli harf e, i, ö veya ü ise
            }

            // Ön ekleri belirleyelim (kaynaştırma harfi)
            if ( sesliHarfler.indexOf( sonHarf ) > -1 ) { // Sesli ile mi bitiyor
                if (hal == haller[0]) { // iyelik hali ise
                    ek = 'n' + ek
                }
                if (hal == haller[1] || hal == haller[2]) { // i veya e hali ise
                    ek = 'y' + ek
                }
            }
            if (hal == haller[3]  || hal == haller[4]) { // de veya den hali ise
                ek = (sertUnsuzler.indexOf( sonHarf ) > -1 ? 't' : 'd') + ek;
            }

            // Son ekleri belirleyelim
            if (hal == haller[0] || hal == haller[4]) { // iyelik veya den hali ise
                ek += 'n'
            }

            // Isimle birlestirip donelim
            return isim + "'" + ek;
        }
    }
})();