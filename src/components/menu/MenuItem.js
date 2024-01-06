export default function MenuItem(){
  return(
    <div className="bg-gray-200 p-4 text-xl rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img src="/pizza-2.png" alt="pizza" className="max-h-24 block mx-auto" />
      </div>
      <h4 className="font-semibold my-3">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos.</p>
      <button className="bg-primary text-white rounded-full mt-4 px-8 py-2">
        Add to cart R$1
      </button>
    </div>
  );
}