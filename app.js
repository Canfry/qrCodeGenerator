const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

function onGenerateSubmit(e) {
  e.preventDefault();

  clearUI();

  // Adding value because it's an input
  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;

  // console.log(url, size);

  // Put some validation
  if (url === '') {
    alert('Please enter a full URL');
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      setTimeout(() => {
        const saveUrl = qr.querySelector('img').src;
        createSaveBtn(saveUrl);
      }, 50);
    }, 600);
  }
}

// Create funciton to clear UI if want to generate another qr code with different size.
function clearUI() {
  qr.innerHTML = '';
  // To clear the save qrcode button
  const saveLink = document.getElementById('save-link');
  if (saveLink) {
    saveLink.remove();
  }
}

function generateQRCode(url, size) {
  new QRCode(document.getElementById('qrcode'), {
    text: url,
    width: size,
    height: size,
  });
}

function showSpinner() {
  document.getElementById('spinner').style.display = 'block';
}

function hideSpinner() {
  document.getElementById('spinner').style.display = 'none';
}

// Create the save button link
function createSaveBtn(saveUrl) {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList =
    'bg-red-500 hover:bg-red-700 text-white py-2 rounded w-1/3 m-auto mb-10 my-5';
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerHTML = 'Save image';
  document.getElementById('generated').appendChild(link);
}

form.addEventListener('submit', onGenerateSubmit);
