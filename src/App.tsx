/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Map as MapIcon, 
  Store, 
  Users, 
  Globe, 
  Menu,
  Minus,
  ExternalLink,
  MessageSquare,
  Heart,
  Droplets,
  AlertCircle,
  Play,
  Video,
  Lock,
  Unlock,
  Move,
  Volume2,
  VolumeX
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

// CSS fix for Leaflet marker icons in React/Vite
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Store images
const humanaImg = 'humana.png';
const babyBazarImg = 'babyBazar.png';
const fleaImg = 'flea.png';
const vintageFeImg = 'vintagefe.png';
const emmausImg = 'emmaus.png';
const dinoFerrariImg = 'dinoferrari.png';
const comeNuovoImg = 'comenuovo.png';
const dongiImg = 'ildongi.png';
const mobiliImg = 'mobilidiscount.png';
const ruotaImg = 'ruota.png';
const secondamaninaBovoloneImg = 'secondamaninabovolone.png';
const minimeImg = 'minime.png';
const usaeriusaImg = 'usaeriusa.png';
const ghedetutoImg = 'ghedetuto.png';
const secondamaninaEstImg = 'secondamaninaest.png';
const mercatoUsatoImg = 'lamercatino.png';

// World images
const ranaplazaMain = 'ranaplaza.jpg';
const ranaplaza1 = 'ranaplaza1.jpg';
const ranaplaza2 = 'ranaplaza2.jpg';
const ranaplaza3 = 'ranaPlaza3.png';
const ranaplaza4 = 'ranaPlaza4.png';
const mainVideo = 'video.mp4';
const logoImg = 'Logo.png';
const clothesImg = 'clothes.jpg';
const greenShirtIcon = 'green-shirt.png';

// Store Data with integrated images
const STORES_DATA = [
  { id: 1, name: "Humana Store", lat: 45.4396578, lng: 10.9893858, address: "Piazza Pasque Veronesi, 5a, 37121 Verona VR", maps: "https://www.google.com/maps/place/Humana+Vintage+Verona/@45.4396354,10.9868134,17z/data=!3m1!4b1!4m6!3m5!1s0x477f5f908225e553:0x49a1d337c799e083!8m2!3d45.4396354!4d10.9893883!16s%2Fg%2F11p0w66v07?entry=ttu", image: humanaImg },
  { id: 2, name: "Baby Bazar Verona", lat: 45.4463865, lng: 10.9534765, address: "C.so Milano, 114/A, 37138 Verona VR", maps: "https://www.google.com/maps/place/BABYBAZAR+Verona+Borgo+Milano/@45.4461306,10.9485627,16z/data=!3m1!4b1!4m6!3m5!1s0x4781e18d2150b701:0x20497d3b6940330a!8m2!3d45.4461307!4d10.9534336!16s%2Fg%2F11b6gdhy9f?entry=ttu", image: babyBazarImg },
  { id: 3, name: "FLEA Secondhand Upcycling", lat: 45.443257, lng: 11.020271, address: "Via Cesare Betteloni, 42D, 37131 Verona VR", maps: "https://www.google.com/maps/place/FLEA+Secondhand+Upcycling/@45.4432754,11.0202247,17z/data=!3m1!4b1!4m6!3m5!1s0x477f5e3e6c77dfaf:0x566ccfda3aa8c08c!8m2!3d45.4432754!4d11.0202247!16s%2Fg%2F11t1rhwjht?entry=ttu", image: fleaImg },
  { id: 4, name: "Mercatino Vintage Verona", lat: 45.435861, lng: 10.985868, address: "Via Guglielmo Marconi, 62/A, 37122 Verona VR", maps: "https://www.google.com/maps/place/Mercatino+Vintage+Verona+(Vintage+Fe)/@45.4309918,10.9613805,13.96z/data=!4m6!3m5!1s0x477f5f5ca66d63c7:0xcc64ee34ee6bd851!8m2!3d45.4358653!4d10.985866!16s%2Fg%2F11c2ppdjn5?entry=ttu", image: vintageFeImg },
  { id: 5, name: "Emmaus Villafranca", lat: 45.355522, lng: 10.812831, address: "Localita' Emmaus 1, Villafranca", maps: "https://www.google.com/maps/place/Mercatino+solidale+-+Comunità+Emmaus+Villafranca/@45.355345,10.8102567,17z/data=!3m1!4b1!4m6!3m5!1s0x4781ddb241625f07:0xbff5b4f9d924165b!8m2!3d45.3553413!4d10.8128316!16s%2Fg%2F11b5pjm27r?hl=it&entry=ttu", image: emmausImg },
  { id: 6, name: "Mercatino Ferrari Dino", lat: 45.41537, lng: 10.974248, address: "Viale dell' Industria, 38/D, 37135 Verona VR", maps: "https://www.google.com/maps/place/Mercatino+Dell'Usato+Di+Ferrari+Dino/@45.4151579,10.971293,17.25z/data=!4m6!3m5!1s0x477f5f78ebc11285:0x34b546729fa68447!8m2!3d45.4152422!4d10.974281!16s%2Fg%2F1td70vpg?hl=it&entry=ttu", image: dinoFerrariImg },
  { id: 7, name: "Come Nuovo", lat: 45.421908, lng: 10.970797, address: "Via Carlo Alberto, 1, 37136 Verona VR", maps: "https://www.google.com/maps/place/Comenuovo/@45.4217538,10.9682552,17z/data=!3m1!4b1!4m6!3m5!1s0x477f5f7d13702a77:0xd0892a1faf1ee6f5!8m2!3d45.4217501!4d10.9708301!16s%2Fg%2F1ptx91hfb?hl=it&entry=ttu", image: comeNuovoImg },
  { id: 8, name: "il DONGI", lat: 45.187005, lng: 11.241231, address: "Via Calcara, 119, 37053 Cerea VR", maps: "https://www.google.com/maps/place/il+DONGI+Second+Life+Shop/@45.1868501,11.2386141,17z/data=!3m2!4b1!5s0x477f72bcdf77bd33:0xda4a4920a9183c08!4m6!3m5!1s0x477f72bce7f2baa9:0x954177a95e918dd0!8m2!3d45.1868463!4d11.241189!16s%2Fg%2F1tdm2k_y?hl=it&entry=ttu", image: dongiImg },
  { id: 9, name: "Mobili Discount", lat: 45.423413, lng: 10.992084, address: "Via Basso Acquar, 69, 37135 Verona VR", maps: "https://www.google.com/maps/place/Mercatino+Mobil+Discount/@45.4231949,10.9893163,16z/data=!3m1!4b1!4m6!3m5!1s0x477f5f6d1a66203f:0x764ec6b489fa6cac!8m2!3d45.4231912!4d10.9918912!16s%2Fg%2F1234lrq_4?hl=it&entry=ttu", image: mobiliImg },
  { id: 10, name: "La Ruota", lat: 45.41352, lng: 10.957143, address: "Via Germania, 19, 37136 Verona VR", maps: "https://www.google.com/maps/place/Mercatino+La+Ruota+dell'Usato/@45.413336,10.9545687,17z/data=!3m2!4b1!5s0x4781e1cca2052471:0x7e99f425abbb49fc!4m6!3m5!1s0x4781e1cca40244c7:0x33387d398bc7faf2!8m2!3d45.4133323!4d10.9571436!16s%2Fg%2F11b6_49gc9?hl=it&entry=ttu", image: ruotaImg },
  { id: 11, name: "Secondamanina Bovolone", lat: 45.253883, lng: 11.127796, address: "Via S. Pierino, 42, 37051 Bovolone VR", maps: "https://www.google.com/maps/place/Mercatino+Usato+Bimbi+SECONDAMANINA/@45.2536378,11.1251683,17z/data=!3m1!4b1!4m6!3m5!1s0x477f6f0e607924e1:0x4f071175ad45795d!8m2!3d45.2536341!4d11.1277432!16s%2Fg%2F11c60j6qqp?hl=it&entry=ttu", image: secondamaninaBovoloneImg },
  { id: 12, name: "Minimè", lat: 45.34956, lng: 10.879336, address: "Via Pompei, 8A, 37064 Povegliano Veronese VR", maps: "https://www.google.com/maps/place/Minimè/@45.3494211,10.8768042,17z/data=!3m2!4b1!5s0x4781de59b770ac6f:0x8089d288b4171099!4m6!3m5!1s0x4781df091a1e15e1:0x338bc529a8844523!8m2!3d45.3494174!4d10.8793791!16s%2Fg%2F11sm_ns0rx?hl=it&entry=ttu", image: minimeImg },
  { id: 13, name: "Usa e Riusa", lat: 45.434778, lng: 11.011583, address: "Via Nicolò Giolfino, 2, 37133 Verona VR", maps: "https://www.google.com/maps/place/mercatino+usato+Usa+e+Riusa/@45.4345493,11.0090941,17z/data=!3m1!4b1!4m6!3m5!1s0x477f5f24b824bfcd:0xcb475fc855d04322!8m2!3d45.4345456!4d11.011669!16s%2Fg%2F1tw_m25z?hl=it&entry=ttu", image: usaeriusaImg },
  { id: 14, name: "Ghedetuto", lat: 45.402904, lng: 11.022206, address: "Strada Corte Garofolo, 10, 37057 Verona VR", maps: "https://www.google.com/maps/place/Mercatino+dell'usato+Ghedetuto+OPERAZIONE+MATO+GROSSO/@45.4027196,11.0198035,17z/data=!3m1!4b1!4m6!3m5!1s0x477f5e5a7499bfef:0xb8092bf97f0ae5b4!8m2!3d45.4027159!4d11.0223784!16s%2Fg%2F11bwh5rqml?hl=it&entry=ttu", image: ghedetutoImg },
  { id: 15, name: "Secondamanina Est", lat: 45.439279, lng: 11.100865, address: "Via Adamello, 8/D, 37036 San Martino Buon Albergo VR", maps: "https://www.google.com/maps/place/Secondamanina+Verona/@45.4256064!4d11.1002097!16s%2Fg%2F1hc28_tql?entry=ttu", image: secondamaninaEstImg },
  { id: 16, name: "Mercato Usato Verona", lat: 45.408373, lng: 10.980803, address: "Via Angelo Messedaglia, 8 b, 37135 Verona VR", maps: "https://www.google.com/maps/place/Mercatino+usato+verona/@45.4080576,10.9807175,15z/data!4m6!3m5!1s0x477f5fc321a5187f:0x3757f24c81763a4c!8m2!3d45.4079256!4d10.9806489!16s%2Fg%2F11h3c48vgz?entry=ttu", image: mercatoUsatoImg },
];

const NAV_ITEMS = [
  { id: 'mission', label: 'CHI SIAMO', icon: Users },
  { id: 'map', label: 'MAPPA NEGOZI', icon: MapIcon },
  { id: 'list', label: 'ELENCO NEGOZI', icon: Store },
  { id: 'world', label: 'NEL MONDO', icon: Globe },
];

function MapResizer({ stores, isUnlocked }: { stores: typeof STORES_DATA, isUnlocked: boolean }) {
  const map = useMap();
  const zoomControlRef = useRef<L.Control.Zoom | null>(null);
  
  useEffect(() => {
    if (stores.length > 0) {
      const bounds = L.latLngBounds(stores.map(s => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [20, 20], animate: false });
    }
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 500);
    return () => clearTimeout(timer);
  }, [map, stores]);

  useEffect(() => {
    if (isUnlocked) {
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
      
      if (!zoomControlRef.current) {
        zoomControlRef.current = L.control.zoom({ position: 'topleft' });
        zoomControlRef.current.addTo(map);
      }
    } else {
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
      
      if (zoomControlRef.current) {
        zoomControlRef.current.remove();
        zoomControlRef.current = null;
      }
    }
    
    return () => {
      if (zoomControlRef.current) {
        zoomControlRef.current.remove();
        zoomControlRef.current = null;
      }
    };
  }, [map, isUnlocked]);

  return null;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('mission');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMapUnlocked, setIsMapUnlocked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay blocked by browser, waiting for interaction", error);
      });
    }
  }, [activeTab]);

  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="flex items-center justify-center w-8 h-8 relative group">
        <div class="absolute inset-0 bg-accent/20 rounded-full animate-ping"></div>
        <div class="w-4 h-4 bg-accent border-2 border-white rounded-full shadow-[0_0_15px_rgba(45,90,39,0.5)] transition-transform group-hover:scale-150"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-deep-black text-slate-900 font-sans overflow-hidden relative">
      {/* Background Watermark */}
      <div className="absolute top-0 right-0 p-4 lg:p-8 opacity-5 pointer-events-none z-0 overflow-hidden text-accent">
        <div className="text-[120px] lg:text-[400px] font-black leading-none select-none tracking-tighter">RM</div>
      </div>

      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-accent/10 bg-deep-black z-30 text-slate-900">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="Logo" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Revolution<span className="text-accent">Minds</span></span>
        </div>
        <div className="text-[8px] font-bold tracking-[0.2em] opacity-40 uppercase">Verona // 2024</div>
      </div>

      {/* Sidebar (Desktop Only) */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="hidden lg:flex h-full bg-deep-black border-r border-accent/10 flex-col relative z-20 shrink-0 text-slate-900"
      >
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center p-1 bg-accent/5 border border-accent/10">
            <img src={logoImg} alt="RM Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          {isSidebarOpen && (
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-[10px] tracking-[0.3em] uppercase leading-tight"
            >
              Revolution<br/><span className="text-accent">Minds</span>
            </motion.h1>
          )}
        </div>

        <nav className="flex-1 mt-12 space-y-1 px-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-6 px-4 py-4 rounded-none transition-all group relative ${
                activeTab === item.id 
                  ? 'bg-accent text-white font-black' 
                  : 'hover:bg-accent/5 text-slate-500 hover:text-accent'
              }`}
            >
              <item.icon className={`w-4 h-4 shrink-0 ${activeTab === item.id ? 'stroke-[3px]' : ''}`} />
              {isSidebarOpen && (
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-accent/10 text-[9px] font-bold tracking-[0.4em] opacity-30 text-center uppercase text-slate-900">
          Verona // 2024
        </div>

        <div className="p-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-none bg-accent/5 hover:bg-accent/10 transition-colors text-accent"
          >
            {isSidebarOpen ? <Minus className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-10 flex flex-col custom-scrollbar">
        <header className="px-6 lg:px-12 py-8 lg:py-12">
          <div className="hidden lg:flex justify-between items-end mb-8 text-[10px] uppercase font-bold tracking-[0.3em] opacity-40">
            <div>RevolutionMinds / {activeTab === 'mission' ? 'Paradigm' : 'Systems'}</div>
            <div className="flex gap-8">
              <span>Philosophy</span>
              <span>Sustainability</span>
            </div>
          </div>
          
          <div className="accent-line h-[1px] mb-8 lg:mb-16 opacity-30"></div>
          
          <div className="flex flex-col gap-0 -ml-1 md:-ml-2">
            <div className="flex items-baseline gap-4 opacity-50 mb-2">
              <span className="text-xs lg:text-sm italic font-serif leading-none">01</span>
              <span className="text-[8px] lg:text-[10px] uppercase tracking-widest font-black leading-none">
                {activeTab === 'world' ? 'Global Impact Analysis' : 'Verona Second-Hand Map'}
              </span>
            </div>
            <motion.h2 
              key={activeTab}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bold-typography-h1 leading-[0.75]"
            >
              {activeTab === 'mission' ? 'CHI' : activeTab === 'map' ? 'MAPPA' : activeTab === 'list' ? 'LISTA' : 'NEL'}
            </motion.h2>
            <div className="flex items-center gap-4 lg:gap-12 -mt-1 md:-mt-2">
              <motion.h2 
                key={`${activeTab}-sub`}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bold-typography-h1 text-accent"
              >
                {activeTab === 'mission' ? 'SIAMO' : activeTab === 'map' ? 'NEGOZI' : activeTab === 'list' ? 'STORES' : 'MONDO'}
              </motion.h2>
              <div className="max-w-xs hidden lg:block mt-8">
                <p className="text-xs leading-relaxed opacity-60 tracking-tight italic font-serif">
                  Ridurre l'impatto ambientale legato all'industria della moda attraverso il consumo consapevole.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 lg:px-12 pb-24 lg:pb-12 flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full"
            >
              {activeTab === 'mission' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-12">
                    <section className="bg-transparent pt-12 border-t border-accent/10 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-all pointer-events-none">
                         <img src={clothesImg} alt="Clothes background" className="w-64 h-64 object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex items-center gap-3 mb-8">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Mission // 01 Unisciti al cambiamento</span>
                      </div>
                      <div className="space-y-6 text-lg font-light leading-relaxed text-slate-700 max-w-2xl border-l-[3px] border-accent pl-8 relative z-10">
                        <p>
                          Siamo 5 studenti presso l'ITS di Web Development e abbiamo l'ambizione di creare un impatto positivo nella nostra comunità.
                        </p>
                        <p>
                          Il nostro obiettivo è evidenziare l'importanza di <span className="text-accent font-bold">ridurre l'impatto ambientale</span> legato all'industria della moda, caratterizzata da produzioni inquinanti e sprechi.
                        </p>
                        <p className="text-sm opacity-60 italic font-serif">
                          — Dennis Bottari, Yasmine Giuliani, Matteo Leto, Fabian Dumea, Diego Milli
                        </p>
                      </div>
                    </section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-accent/5">
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black tracking-[0.4em] uppercase opacity-30">Pillastri</h4>
                        <div className="space-y-4">
                          {[
                            { label: "Consumo Consapevole", icon: Heart },
                            { label: "Riduzione Sprechi", icon: Droplets },
                            { label: "Etica del Lavoro", icon: Users }
                          ].map(item => (
                            <div key={item.label} className="flex items-center gap-4 group cursor-pointer border-b border-accent/5 pb-3">
                              <item.icon className="w-4 h-4 text-accent" />
                              <p className="text-xs font-bold tracking-tight uppercase group-hover:text-accent transition-colors text-slate-700">{item.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black tracking-[0.4em] uppercase opacity-30">Metriche</h4>
                        <div className="flex items-baseline gap-4">
                          <span className="text-5xl font-light tracking-tighter">{STORES_DATA.length}</span>
                          <span className="text-[10px] uppercase font-bold opacity-40 tracking-widest leading-none">Negozi mappati</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-12">
                    {/* Video Section */}
                    <div className="bg-white border border-accent/10 p-4 shadow-sm group">
                      <div className="flex items-center gap-3 mb-4 text-accent">
                        <Video className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Official Content // 01</span>
                      </div>
                      <div className="aspect-video bg-deep-black relative overflow-hidden flex items-center justify-center group-hover:shadow-lg transition-all">
                        <video 
                          ref={videoRef}
                          src={mainVideo} 
                          autoPlay 
                          muted={isMuted}
                          loop 
                          playsInline
                          className="w-full h-full object-cover"
                          poster={clothesImg}
                        >
                          Il tuo browser non supporta il tag video.
                        </video>
                        
                        {/* Custom Audio Toggle Overlay */}
                        <button 
                          onClick={() => setIsMuted(!isMuted)}
                          className="absolute bottom-4 right-4 z-20 p-3 bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-accent hover:border-accent transition-all group/btn"
                        >
                          <div className="flex items-center gap-2">
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">{isMuted ? 'Attiva Audio' : 'Muto'}</span>
                          </div>
                        </button>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                      </div>
                    </div>

                    <div className="bg-white border border-accent/10 p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4 text-accent">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Educational Corner // 01</span>
                      </div>
                      <h4 className="text-xl font-bold uppercase tracking-tighter mb-4 text-slate-900">Cos'è la Carbon Footprint?</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        L'<span className="font-bold text-accent">Impronta di Carbonio</span> è la misura dei gas serra emessi dalle nostre attività quotidiane. In ambito fashion, ogni nuovo acquisto genera emissioni durante la coltivazione delle fibre, la tintura chimica, il trasporto intercontinentale e il fine-vita in discarica. <span className="italic">Ridurre, Riutilizzare e Scegliere l'Usato</span> sono le tue armi più potenti per contrastare questo impatto.
                      </p>
                    </div>

                    <div className="bg-accent text-white p-6 lg:p-10 relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 opacity-10 font-black text-6xl italic">FASHION</div>
                      <h3 className="text-3xl font-black leading-none tracking-tighter uppercase mb-6 italic font-serif">SCOPRI IL TUO IMPATTO</h3>
                      <p className="text-xs font-medium mb-12 opacity-80 leading-snug">
                        Vuoi sapere quanto inquina il tuo armadio? Fai il quiz e scopri la tua impronta ecologica.
                      </p>
                      <a 
                        href="https://www.thredup.com/fashionfootprint/" 
                        target="_blank"
                        className="block w-full py-4 bg-black text-white text-center font-black text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all"
                      >
                        VAI AL QUIZ
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'map' && (
                <div className="h-[70vh] min-h-[500px] border border-accent/10 relative overflow-hidden bg-accent/5">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 animate-pulse uppercase font-black text-xs tracking-widest bg-deep-black z-0">
                    Sincronizzazione Unità Geo-Mappa...
                  </div>
                  
                  <MapContainer 
                    center={[45.4396, 10.9913]} 
                    zoom={13} 
                    zoomControl={false}
                    className="h-full w-full relative z-10"
                    style={{ background: '#f8f9f8' }}
                  >
                    <MapResizer stores={STORES_DATA} isUnlocked={isMapUnlocked} />
                    <TileLayer
                      attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                      url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                    />
                    {STORES_DATA.map(store => (
                      <Marker 
                        key={store.id} 
                        position={[store.lat, store.lng]} 
                        icon={customIcon}
                      >
                        <Popup closeButton={false} minWidth={200}>
                          <div className="p-3 space-y-3 font-sans">
                            <img src={store.image} className="w-full h-24 object-cover border border-black/10" referrerPolicy="no-referrer" />
                            <div>
                              <h4 className="font-black text-gray-900 text-sm uppercase tracking-tight leading-none">{store.name}</h4>
                              <p className="text-[10px] text-gray-500 tracking-tight mt-2 leading-tight">{store.address}</p>
                            </div>
                            <a 
                              href={store.maps} 
                              target="_blank" 
                              className="w-full bg-accent text-white text-center py-2 font-black text-[10px] uppercase tracking-widest block hover:bg-black transition-colors"
                            >
                              MAPS_
                            </a>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>

                  {/* Move/Interaction Toggle */}
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                    <button 
                      onClick={() => setIsMapUnlocked(!isMapUnlocked)}
                      className={`p-4 shadow-xl border-2 transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-widest ${
                        isMapUnlocked 
                          ? 'bg-accent border-accent text-white' 
                          : 'bg-white border-accent/20 text-accent hover:border-accent'
                      }`}
                    >
                      {isMapUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      <span className="hidden sm:inline">{isMapUnlocked ? 'Mappa Sbloccata' : 'Bloccata per Scorrimento'}</span>
                    </button>
                    {isMapUnlocked && (
                      <div className="bg-white/90 p-3 text-[8px] font-bold text-accent uppercase tracking-tighter border border-accent/10 animate-fade-in">
                        Puoi muovere la mappa ora
                      </div>
                    )}
                  </div>
                  
                  {/* Overlay rimosso */}
                </div>
              )}

              {activeTab === 'list' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {STORES_DATA.map(store => (
                    <motion.div 
                      key={store.id} 
                      whileHover={{ y: -5 }}
                      className="border border-accent/10 hover:border-accent/40 transition-all bg-white flex flex-col group overflow-hidden shadow-sm"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={store.image} 
                          alt={store.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-0 left-0 p-4 bg-accent/90 text-white font-serif italic text-xs z-10">
                          0{store.id}
                        </div>
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-black tracking-tighter uppercase leading-none">{store.name}</h4>
                          <ExternalLink className="w-3 h-3 opacity-20 group-hover:opacity-100 group-hover:text-accent" />
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-8 line-clamp-2 leading-tight">{store.address}</p>
                        <a 
                          href={store.maps} 
                          target="_blank"
                          className="mt-auto inline-block py-3 px-6 bg-accent/5 hover:bg-accent hover:text-white text-[9px] font-black tracking-[0.2em] uppercase transition-all text-center border border-accent/10"
                        >
                          VAI A MAPS_
                        </a>
                      </div>
                    </motion.div>
                  ))}
                  <div className="border border-accent/10 p-8 border-dashed flex flex-col justify-center items-center text-center opacity-40 hover:opacity-100 transition-opacity">
                    <MessageSquare className="w-8 h-8 mb-4" />
                    <p className="text-[10px] font-black tracking-widest uppercase">NUOVO NODO?</p>
                    <p className="text-[9px] mt-2 italic font-serif">Inviaci i dettagli del negozio</p>
                  </div>
                </div>
              )}

              {activeTab === 'world' && (
                <div className="space-y-12 max-w-4xl">
                  <section className="bg-transparent pt-12 border-t border-accent/20 relative">
                    <div className="flex items-center gap-3 mb-8">
                      <AlertCircle className="text-accent w-5 h-5" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Case Study // Rana Plaza Tragedy</span>
                    </div>
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                           <h3 className="text-4xl font-black tracking-tighter uppercase leading-none mb-6">L'ECCIDIO DELLA MODA VELOCE</h3>
                           <div className="space-y-4 text-sm leading-relaxed opacity-70">
                            <p>
                              1134 persone hanno perso la vita nel 2013, in Bangladesh, per colpa di grandi brand che continuiamo a finanziare inconsapevoli dei diritti violati.
                            </p>
                            <p>
                              Oltre 2500 feriti. Le crepe segnalate il giorno prima furono ignorate dai proprietari delle fabbriche. Il sistema ha scelto il profitto sulla vita umana.
                            </p>
                          </div>
                        </div>
                        <div className="relative group">
                          <img src={ranaplazaMain} alt="Rana Plaza" className="w-full h-80 object-cover border border-accent/10" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <img src={ranaplaza1} alt="Rana Plaza detail 1" className="w-full h-32 object-cover border border-accent/10" referrerPolicy="no-referrer" />
                        <img src={ranaplaza2} alt="Rana Plaza detail 2" className="w-full h-32 object-cover border border-accent/10" referrerPolicy="no-referrer" />
                        <img src={ranaplaza3} alt="Rana Plaza detail 3" className="w-full h-32 object-cover border border-accent/10" referrerPolicy="no-referrer" />
                        <img src={ranaplaza4} alt="Rana Plaza detail 4" className="w-full h-32 object-cover border border-accent/10" referrerPolicy="no-referrer" />
                      </div>
                      
                      <div className="bg-accent/5 p-8 border border-accent/10">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-4 italic font-serif text-accent">Brand Watchlist</p>
                        <p className="text-xs tracking-[0.05em] text-slate-600 leading-relaxed uppercase font-bold">
                          Primark, Benetton, Camaieu, H&M, Zara, Bershka, Pull and Bear, Oysho, Stradivarius, Walmart...
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="px-6 lg:px-12 py-8 mt-auto border-t border-accent/10 flex flex-col md:flex-row gap-4 justify-between items-center text-[9px] font-bold tracking-[0.3em] uppercase opacity-30 text-slate-900">
          <div>Made by // Bottari, Giuliani, Leto, Dumea, Milli</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-accent transition-colors">GitHub</a>
            <a href="#" className="hover:text-accent transition-colors">Contact</a>
          </div>
        </footer>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-deep-black border-t border-accent/10 flex items-center justify-around px-2 z-40">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all ${
              activeTab === item.id 
                ? 'text-accent' 
                : 'text-slate-400'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'stroke-[2.5px]' : ''}`} />
            <span className="text-[7px] font-black tracking-widest uppercase truncate max-w-full px-1">{item.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
