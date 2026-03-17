import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const PIXEL_ID = "783027081098083";
const ACCESS_TOKEN = process.env.EAFYzF3XBTyUBQ7OZB8Pf53lpZCx8YxiVbXS8ZBqtSJKrKPltaVFxVsKKm2bpckXGMhlZACxNTZBq1VhI6c3n2SAJYBJpZASuEg9kzZB8Yogb1dZCm3ZCoTZAMlyHHyLLQuVJNXLzDAnxcdp9cYZALq7XW84Qu4ZAwUtEVaDuQR3ZBSVnByr8U8gNwz47H75LXCZCVG5oB6RAZDZD;
const API_VERSION = "v21.0";

if (!ACCESS_TOKEN) {
  throw new Error("META_ACCESS_TOKEN is missing");
}

app.post("/api/meta/lead", async (req, res) => {
  try {
    const { eventId, eventSourceUrl, fbp, fbc, testEventCode } = req.body;

    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_id: eventId,
          event_source_url: eventSourceUrl || "https://www.i88rayamy26.com/",
          user_data: {
            fbp: fbp || undefined,
            fbc: fbc || undefined,
          },
        },
      ],
    };

    if (testEventCode) {
      payload.test_event_code = testEventCode;
    }

    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Meta CAPI error:", result);
      return res.status(500).json(result);
    }

    console.log("Meta CAPI success:", result);
    return res.json(result);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: String(error) });
  }
});

app.listen(3001, () => {
  console.log("Meta CAPI server running on port 3001");
});
