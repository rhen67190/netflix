export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    return res.status(405).json({
      status: false,
      message: "Method not allowed"
    });
  }

  const apiKey = process.env.JEREXD_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      status: false,
      message: "API key belum dikonfigurasi"
    });
  }

  try {
    const response = await fetch(
      "https://api.jerexd.my.id/api/tools/netflixtoken?apikey=" +
        encodeURIComponent(apiKey)
    );

    if (!response.ok) {
      return res.status(502).json({
        status: false,
        message: "Provider API error"
      });
    }

    const result = await response.json();

    if (!result.status) {
      return res.status(502).json({
        status: false,
        message: "Permintaan API gagal"
      });
    }

    // Tidak meneruskan token atau data akun sensitif.
    return res.status(200).json({
      status: true,
      message: "API berhasil terhubung"
    });
  } catch {
    return res.status(502).json({
      status: false,
      message: "Gagal menghubungi provider API"
    });
  }
}