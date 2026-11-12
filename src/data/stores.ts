// Helper to get correct asset path considering base URL
export const asset = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${path}`;
};

export type Store = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  maps: string;
  image: string;
};

export const STORES: Store[] = [
  { id: 1, name: "Humana Store", lat: 45.4396578, lng: 10.9893858, address: "Piazza Pasque Veronesi, 5a, 37121 Verona VR", maps: "https://www.google.com/maps/place/Humana+Vintage+Verona/@45.4396354,10.9868134,17z/data=!3m1!4b1!4m6!3m5!1s0x477f5f908225e553:0x49a1d337c799e083!8m2!3d45.4396354!4d10.9893883!16s%2Fg%2F11p0w66v07?entry=ttu", image: asset('humana.png') },
  { id: 2, name: "Baby Bazar Verona", lat: 45.4463865, lng: 10.9534765, address: "C.so Milano, 114/A, 37138 Verona VR", maps: "https://www.google.com/maps/place/BABYBAZAR+Verona+Borgo+Milano/@45.4461306,10.9485627,16z/data=!3m1!4b1!4m6!3m5!1s0x4781e18d2150b701:0x20497d3b6940330a!8m2!3d45.4461307!4d10.9534336!16s%2Fg%2F11b6gdhy9f?entry=ttu", image: asset('babyBazar.png') },
  { id: 3, name: "FLEA Secondhand Upcycling", lat: 45.443257, lng: 11.020271, address: "Via Cesare Betteloni, 42D, 37131 Verona VR", maps: "https://www.google.com/maps/place/FLEA+Secondhand+Upcycling/@45.4432754,11.0202247,17z/data=!3m1!4b1!4m6!3m5!1s0x477f5e3e6c77dfaf:0x566ccfda3aa8c08c!8m2!3d45.4432754!4d11.0202247!16s%2Fg%2F11t1rhwjht?entry=ttu", image: asset('flea.png') },
  { id: 4, name: "Mercatino Vintage Verona", lat: 45.435861, lng: 10.985868, address: "Via Guglielmo Marconi, 62/A, 37122 Verona VR", maps: "https://www.google.com/maps/place/Mercatino+Vintage+Verona+(Vintage+Fe)/@45.4309918,10.9613805,13.96z/data=!4m6!3m5!1s0x477f5f5ca66d63c7:0xcc64ee34ee6bd851!8m2!3d45.4358653!4d10.985866!16s%2Fg%2F11c2ppdjn5?entry=ttu", image: asset('vintagefe.png') },
  { id: 5, name: "Emmaus Villafranca", lat: 45.355522, lng: 10.812831, address: "Localita' Emmaus 1, Villafranca", maps: "https://www.google.com/maps/place/Mercatino+solidale+-+Comunità+Emmaus+Villafranca/@45.355345,10.8102567,17z/data=!3m1!4b1!4m6!3m5!1s0x4781ddb241625f07:0xbff5b4f9d924165b!8m2!3d45.3553413!4d10.8128316!16s%2Fg%2F11b5pjm27r?hl=it&entry=ttu", image: asset('emmaus.png') },
  { id: 6, name: "Mercatino Ferrari Dino", lat: 45.41537, lng: 10.974248, address: "Viale dell' Industria, 38/D, 37135 Verona VR", maps: "https://www.google.com/maps/place/Mercatino+Dell'Usato+Di+Ferrari+Dino/@45.4151579,10.971293,17.25z/data=!4m6!3m5!1s0x477f5f78ebc11285:0x34b546729fa68447!8m2!3d45.4152422!4d10.974281!16s%2Fg%2F1td70vpg?hl=it&entry=ttu", image: asset('dinoferrari.png') },
  { id: 7, name: "Come Nuovo", lat: 45.421908, lng: 10.970797, address: "Via Carlo Alberto, 1, 37136 Verona VR", maps: "https://www.google.com/maps/place/Comenuovo/@45.4217538,10.9682552,17z/data=!3m1!4b1!4m6!3m5!1s0x477f5f7d13702a77:0xd0892a1faf1ee6f5!8m2!3d45.4217501!4d10.9708301!16s%2Fg%2F1ptx91hfb?hl=it&entry=ttu", image: asset('comenuovo.png') },
  { id: 8, name: "il DONGI", lat: 45.187005, lng: 11.241231, address: "Via Calcara, 119, 37053 Cerea VR", maps: "https://www.google.com/maps/place/il+DONGI+Second+Life+Shop/@45.1868501,11.2386141,17z/data=!3m2!4b1!5s0x477f72bcdf77bd33:0xda4a4920a9183c08!4m6!3m5!1s0x477f72bce7f2baa9:0x954177a95e918dd0!8m2!3d45.1868463!4d11.241189!16s%2Fg%2F1tdm2k_y?hl=it&entry=ttu", image: asset('ildongi.png') },
  { id: 9, name: "Mobili Discount", lat: 45.423413, lng: 10.992084, address: "Via Basso Acquar, 69, 37135 Verona VR", maps: "https://www.google.com/maps/place/Mercatino+Mobil+Discount/@45.4231949,10.9893163,16z/data=!3m1!4b1!4m6!3m5!1s0x477f5f6d1a66203f:0x764ec6b489fa6cac!8m2!3d45.4231912!4d10.9918912!16s%2Fg%2F1234lrq_4?hl=it&entry=ttu", image: asset('mobilidiscount.png') },
  { id: 10, name: "La Ruota", lat: 45.41352, lng: 10.957143, address: "Via Germania, 19, 37136 Verona VR", maps: "https://www.google.com/maps/place/Mercatino+La+Ruota+dell'Usato/@45.413336,10.9545687,17z/data=!3m2!4b1!5s0x4781e1cca2052471:0x7e99f425abbb49fc!4m6!3m5!1s0x4781e1cca40244c7:0x33387d398bc7faf2!8m2!3d45.4133323!4d10.9571436!16s%2Fg%2F11b6_49gc9?hl=it&entry=ttu", image: asset('ruota.png') },
  { id: 11, name: "Secondamanina Bovolone", lat: 45.253883, lng: 11.127796, address: "Via S. Pierino, 42, 37051 Bovolone VR", maps: "https://www.google.com/maps/place/Mercatino+Usato+Bimbi+SECONDAMANINA/@45.2536378,11.1251683,17z/data=!3m1!4b1!4m6!3m5!1s0x477f6f0e607924e1:0x4f071175ad45795d!8m2!3d45.2536341!4d11.1277432!16s%2Fg%2F11c60j6qqp?hl=it&entry=ttu", image: asset('secondamaninabovolone.png') },
  { id: 12, name: "Minimè", lat: 45.34956, lng: 10.879336, address: "Via Pompei, 8A, 37064 Povegliano Veronese VR", maps: "https://www.google.com/maps/place/Minimè/@45.3494211,10.8768042,17z/data=!3m2!4b1!5s0x4781de59b770ac6f:0x8089d288b4171099!4m6!3m5!1s0x4781df091a1e15e1:0x338bc529a8844523!8m2!3d45.3494174!4d10.8793791!16s%2Fg%2F11sm_ns0rx?hl=it&entry=ttu", image: asset('minime.png') },
  { id: 13, name: "Usa e Riusa", lat: 45.434778, lng: 11.011583, address: "Via Nicolò Giolfino, 2, 37133 Verona VR", maps: "https://www.google.com/maps/place/mercatino+usato+Usa+e+Riusa/@45.4345493,11.0090941,17z/data=!3m1!4b1!4m6!3m5!1s0x477f5f24b824bfcd:0xcb475fc855d04322!8m2!3d45.4345456!4d11.011669!16s%2Fg%2F1tw_m25z?hl=it&entry=ttu", image: asset('usaeriusa.png') },
  { id: 14, name: "Ghedetuto", lat: 45.402904, lng: 11.022206, address: "Strada Corte Garofolo, 10, 37057 Verona VR", maps: "https://www.google.com/maps/place/Mercatino+dell'usato+Ghedetuto+OPERAZIONE+MATO+GROSSO/@45.4027196,11.0198035,17z/data=!3m1!4b1!4m6!3m5!1s0x477f5e5a7499bfef:0xb8092bf97f0ae5b4!8m2!3d45.4027159!4d11.0223784!16s%2Fg%2F11bwh5rqml?hl=it&entry=ttu", image: asset('ghedetuto.png') },
  { id: 15, name: "Secondamanina Est", lat: 45.439279, lng: 11.100865, address: "Via Adamello, 8/D, 37036 San Martino Buon Albergo VR", maps: "https://www.google.com/maps/place/Secondamanina+Verona/@45.4256064!4d11.1002097!16s%2Fg%2F1hc28_tql?entry=ttu", image: asset('secondamaninaest.png') },
  { id: 16, name: "Mercato Usato Verona", lat: 45.408373, lng: 10.980803, address: "Via Angelo Messedaglia, 8 b, 37135 Verona VR", maps: "https://www.google.com/maps/place/Mercatino+usato+verona/@45.4080576,10.9807175,15z/data!4m6!3m5!1s0x477f5fc321a5187f:0x3757f24c81763a4c!8m2!3d45.4079256!4d10.9806489!16s%2Fg%2F11h3c48vgz?entry=ttu", image: asset('lamercatino.png') },
];

/** Città o provincia, ricavato dall'indirizzo. */
export const isCity = (s: Store) => /\bVerona VR$/.test(s.address);

/** Comune ricavato dall'indirizzo (ultima parte prima di "VR"). */
export const townOf = (s: Store) => {
  const m = s.address.match(/\d{5}\s+(.+?)\s+VR$/);
  if (m) return m[1];
  const parts = s.address.split(',');
  return parts[parts.length - 1].trim();
};
