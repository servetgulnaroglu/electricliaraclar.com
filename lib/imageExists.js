



const checkImage = path =>
new Promise(resolve => {
   const img = new Image();
   img.src = path;
   img.onload = () => resolve(true);
   img.onerror = () => resolve(false);
});

export default checkImage;