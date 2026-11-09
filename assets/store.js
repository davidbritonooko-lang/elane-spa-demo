/* ÉLANE demo data store — browser-local only. Not a production backend. */
(function(){
  const KEY='elane-demo-v1';
  const seedServices=[
    {id:'nail-mani',category:'Nails',name:'Classic manicure',price:10,duration:40,description:'Shape, tidy, cuticle care and a polished finish.',active:true},
    {id:'nail-gel',category:'Nails',name:'Gel manicure',price:20,duration:60,description:'A neat gel finish with extra wear time.',active:true},
    {id:'nail-pedi',category:'Nails',name:'Classic pedicure',price:15,duration:50,description:'Foot soak, nail care and a fresh finish.',active:true},
    {id:'nail-gel-pedi',category:'Nails',name:'Gel pedicure',price:25,duration:70,description:'A complete pedicure with gel colour.',active:true},
    {id:'nail-acrylic',category:'Nails',name:'Acrylic full set',price:30,duration:90,description:'Extensions, shaping and your chosen finish.',active:true},
    {id:'nail-art',category:'Nails',name:'Nail art add-on',price:10,duration:25,description:'A little detail or expressive custom art.',active:true},
    {id:'hair-cut',category:'Hair',name:'Wash & haircut',price:20,duration:60,description:'Consultation, wash, cut and finish.',active:true},
    {id:'hair-blow',category:'Hair',name:'Wash & blow-dry',price:15,duration:45,description:'A smooth, polished blow-dry finish.',active:true},
    {id:'hair-braids',category:'Hair',name:'Braids / protective styling',price:40,duration:150,description:'Protective styling; final price may vary by length.',active:true},
    {id:'hair-treatment',category:'Hair',name:'Deep conditioning treatment',price:25,duration:60,description:'A nourishing wash-day treatment.',active:true},
    {id:'hair-colour',category:'Hair',name:'Colour consultation & application',price:50,duration:150,description:'Colour service; consultation required in a real salon.',active:true},
    {id:'hair-updo',category:'Hair',name:'Occasion styling / updo',price:35,duration:75,description:'A styled finish for your special occasion.',active:true},
    {id:'barber-cut',category:'Barber',name:'Classic haircut',price:15,duration:35,description:'A tailored cut and clean finish.',active:true},
    {id:'barber-fade',category:'Barber',name:'Fade / taper',price:20,duration:45,description:'Blended detail and a precise outline.',active:true},
    {id:'barber-beard',category:'Barber',name:'Beard trim & shape',price:10,duration:25,description:'Shape, tidy and define.',active:true},
    {id:'barber-combo',category:'Barber',name:'Haircut & beard combo',price:25,duration:60,description:'A complete grooming refresh.',active:true},
    {id:'barber-shave',category:'Barber',name:'Hot towel shave',price:15,duration:35,description:'A traditional-inspired shave experience.',active:true},
    {id:'spa-swedish',category:'Spa',name:'Relaxation massage',price:40,duration:60,description:'A calming full-body massage experience.',active:true},
    {id:'spa-deep',category:'Spa',name:'Deep tissue massage',price:50,duration:75,description:'Focused massage pressure; discuss comfort first.',active:true},
    {id:'spa-back',category:'Spa',name:'Back, neck & shoulder massage',price:25,duration:35,description:'A focused upper-body reset.',active:true},
    {id:'spa-hotstone',category:'Spa',name:'Hot stone ritual',price:55,duration:75,description:'A warm, relaxing massage-style ritual.',active:true},
    {id:'spa-express',category:'Spa',name:'Express refresh facial',price:20,duration:30,description:'A quick cleanse, refresh and moisturise.',active:true},
    {id:'spa-classic',category:'Spa',name:'Classic cleansing facial',price:35,duration:55,description:'Cleanse, gentle exfoliation and hydration.',active:true},
    {id:'spa-hydrate',category:'Spa',name:'Hydrating facial',price:40,duration:60,description:'A comfort-focused hydration ritual.',active:true},
    {id:'spa-glow',category:'Spa',name:'Glow facial',price:45,duration:60,description:'A brightening-inspired facial experience.',active:true},
    {id:'spa-scrub',category:'Spa',name:'Body scrub & exfoliation',price:35,duration:45,description:'A refreshing body exfoliation treatment.',active:true},
    {id:'spa-wrap',category:'Spa',name:'Body wrap & hydration',price:45,duration:60,description:'A nourishing body-care ritual.',active:true},
    {id:'spa-scalp',category:'Spa',name:'Scalp massage',price:15,duration:20,description:'A soothing add-on for your visit.',active:true},
    {id:'spa-foot',category:'Spa',name:'Foot soak & refresh',price:15,duration:25,description:'A relaxing foot-care ritual.',active:true}
  ];
  const seedStaff=[
    {id:'staff-amara',name:'Amara N.',category:'Nails',active:true},
    {id:'staff-wanjiku',name:'Wanjiku M.',category:'Nails',active:true},
    {id:'staff-faith',name:'Faith K.',category:'Nails',active:true},
    {id:'staff-nia',name:'Nia W.',category:'Hair',active:true},
    {id:'staff-miriam',name:'Miriam A.',category:'Hair',active:true},
    {id:'staff-joyce',name:'Joyce T.',category:'Hair',active:true},
    {id:'staff-kevin',name:'Kevin M.',category:'Barber',active:true},
    {id:'staff-brian',name:'Brian K.',category:'Barber',active:true},
    {id:'staff-asha',name:'Asha W.',category:'Spa',active:true},
    {id:'staff-lydia',name:'Lydia N.',category:'Spa',active:true},
    {id:'staff-maya',name:'Maya K.',category:'Spa',active:true}
  ];
  const defaults={
    services:seedServices,staff:seedStaff,bookings:[],
    settings:{
      announcement:'A royal touch. A little time just for you. · Embu, Kenya',
      homeHeadline:'A little more royalty in every day.',
      homeIntro:'Hair, nails, barbering and spa rituals, brought together in one considered space in Embu. Come as you are. Leave feeling unmistakably yourself.',
      address:'Embu Town, Kenya',phone:'+254 7XX XXX XXX',hours:'Mon – Sat · 9am–6pm'
    }
  };
  function clone(value){return JSON.parse(JSON.stringify(value))}
  function read(){
    try{const saved=JSON.parse(localStorage.getItem(KEY));if(saved&&typeof saved==='object')return {...clone(defaults),...saved,settings:{...defaults.settings,...(saved.settings||{})},services:Array.isArray(saved.services)?saved.services:clone(seedServices),staff:Array.isArray(saved.staff)?saved.staff:clone(seedStaff),bookings:Array.isArray(saved.bookings)?saved.bookings:[]}}
    catch(error){console.warn('ÉLANE demo data could not be read.',error)}
    return clone(defaults);
  }
  let data=read();
  function persist(){try{localStorage.setItem(KEY,JSON.stringify(data));window.dispatchEvent(new CustomEvent('elane:datachange',{detail:{key:KEY}}));return true}catch(error){console.error('ÉLANE demo data could not be saved.',error);return false}}
  const api={
    getServices(){return clone(data.services)},
    getActiveServices(){return clone(data.services.filter(x=>x.active))},
    saveService(item){const i=data.services.findIndex(x=>x.id===item.id);if(i<0)data.services.unshift(item);else data.services[i]={...data.services[i],...item};return persist()},
    deleteService(id){data.services=data.services.filter(x=>x.id!==id);return persist()},
    getStaff(){return clone(data.staff)},
    getActiveStaff(category){return clone(data.staff.filter(x=>x.active&&(!category||x.category===category)))},
    saveStaff(item){const i=data.staff.findIndex(x=>x.id===item.id);if(i<0)data.staff.unshift(item);else data.staff[i]={...data.staff[i],...item};return persist()},
    deleteStaff(id){data.staff=data.staff.filter(x=>x.id!==id);return persist()},
    getBookings(){return clone(data.bookings).sort((a,b)=>(b.createdAt||'').localeCompare(a.createdAt||''))},
    saveBooking(item){data.bookings.unshift(item);return persist()},
    updateBooking(id,changes){const i=data.bookings.findIndex(x=>x.id===id);if(i<0)return false;data.bookings[i]={...data.bookings[i],...changes,updatedAt:new Date().toISOString()};return persist()},
    getSettings(){return clone(data.settings)},
    saveSettings(settings){data.settings={...data.settings,...settings};return persist()},
    resetDemo(){data=clone(defaults);return persist()}
  };
  window.ElaneStore=api;
})();
