const button = document.getElementById("checkButton");
const statusText = document.getElementById("status");
const message = document.getElementById("message");
const indicator = document.getElementById("indicator");

button.addEventListener("click", async () => {
  button.disabled = true;
  button.textContent = "Memeriksa...";
  statusText.textContent = "Menghubungkan";
  message.textContent = "Sedang memeriksa koneksi provider.";
  indicator.className = "indicator";

  try {
    const response = await fetch("/api/token", {
      cache: "no-store"
    });

    const result = await response.json();

    if (!response.ok || !result.status) {
      throw new Error(result.message || "Koneksi gagal");
    }

    statusText.textContent = "Terhubung";
    message.textContent = result.message;
    indicator.className = "indicator online";
  } catch (error) {
    statusText.textContent = "Gagal";
    message.textContent = error.message || "Terjadi kesalahan.";
    indicator.className = "indicator error";
  } finally {
    button.disabled = false;
    button.textContent = "Periksa koneksi API";
  }
});