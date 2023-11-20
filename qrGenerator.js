// Description: Generate QR code from text
const arrayBufferToBase64 = buffer => {
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));

    bytes.forEach((b) => binary += String.fromCharCode(b));

    return window.btoa(binary);
}


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  getQRCode(tabs[0].url);
});

// const currentUrl = window.location.href.toString();

async function getQRCode(currentUrl) {

    await fetch(`https://quickchart.io/qr?text=${currentUrl}`).then(res => res.arrayBuffer()).then(buffer => {
    const base64Flag = 'data:image/png;base64,';
    const imageStr = arrayBufferToBase64(buffer);

    document.getElementById('qrCodeImg').src = base64Flag + imageStr;
  });

}

