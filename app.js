const $ = (id) => document.getElementById(id);

const fields = {
  warType: $("warType"),
  guildName: $("guildName"),
  warDate: $("warDate"),
  warTime: $("warTime"),
  channel: $("channel"),
  region: $("region"),
  nodeName: $("nodeName"),
  tierRules: $("tierRules"),
  objective: $("objective"),
  territory: $("territory"),
  castleArea: $("castleArea"),
  siegeRules: $("siegeRules"),
  allies: $("allies"),
  enemyGuilds: $("enemyGuilds"),
  rules: $("rules"),
  notes: $("notes"),
  shotcaller: $("shotcaller"),
  rallyTime: $("rallyTime"),
  accentColor: $("accentColor"),
  backgroundColor: $("backgroundColor"),
  panelColor: $("panelColor"),
  textColor: $("textColor"),
  fontFamily: $("fontFamily")
};

const presets = {
  command: {
    name: "Command",
    accent: "#d6a84f",
    accent2: "#b94747",
    bg: "#12161d",
    panel: "#202833",
    text: "#f4efe6",
    font: "Inter, Segoe UI, Arial, sans-serif"
  },
  crimson: {
    name: "Crimson",
    accent: "#ffca6e",
    accent2: "#c83e4d",
    bg: "#171015",
    panel: "#2a1a22",
    text: "#fff1e6",
    font: "'Trebuchet MS', Segoe UI, sans-serif"
  },
  parchment: {
    name: "Parchment",
    accent: "#8e4f25",
    accent2: "#2f6653",
    bg: "#e8dcc6",
    panel: "#f6eddc",
    text: "#231b16",
    font: "Georgia, 'Times New Roman', serif"
  },
  frost: {
    name: "Frost",
    accent: "#82d7ff",
    accent2: "#6e83ff",
    bg: "#101821",
    panel: "#1d2a36",
    text: "#eff8ff",
    font: "Inter, Segoe UI, Arial, sans-serif"
  }
};

let activePreset = "command";
let mapDataUrl = "";

function splitLines(value) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatDate(dateValue) {
  if (!dateValue) return "Today";
  const date = new Date(`${dateValue}T12:00:00`);
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(date);
}

function addDetail(list, label, value) {
  if (!value) return;
  const dt = document.createElement("dt");
  const dd = document.createElement("dd");
  dt.textContent = label;
  dd.textContent = value;
  list.append(dt, dd);
}

function fillList(element, values, fallback) {
  element.innerHTML = "";
  const items = values.length ? values : [fallback];
  items.forEach((value) => {
    const li = document.createElement("li");
    li.textContent = value;
    element.appendChild(li);
  });
}

function updateWarFields() {
  const isSiege = fields.warType.value === "siege";
  $("nodewarFields").classList.toggle("is-hidden", isSiege);
  $("siegeFields").classList.toggle("is-hidden", !isSiege);
}

function getTheme() {
  return {
    accent: fields.accentColor.value,
    accent2: presets[activePreset]?.accent2 || "#b94747",
    bg: fields.backgroundColor.value,
    panel: fields.panelColor.value,
    text: fields.textColor.value,
    font: fields.fontFamily.value
  };
}

function applyTheme(theme) {
  fields.accentColor.value = theme.accent;
  fields.backgroundColor.value = theme.bg;
  fields.panelColor.value = theme.panel;
  fields.textColor.value = theme.text;
  fields.fontFamily.value = theme.font;
  updatePreview();
}

function syncExportTheme() {
  const theme = getTheme();
  const announcement = $("announcement");
  announcement.style.setProperty("--export-accent", theme.accent);
  announcement.style.setProperty("--export-accent-2", theme.accent2);
  announcement.style.setProperty("--export-bg", theme.bg);
  announcement.style.setProperty("--export-panel", theme.panel);
  announcement.style.setProperty("--export-text", theme.text);
  announcement.style.setProperty("--export-font", theme.font);
}

function updatePreview() {
  updateWarFields();
  syncExportTheme();

  const isSiege = fields.warType.value === "siege";
  $("previewWarType").textContent = isSiege ? "Siege Briefing" : "Nodewar Briefing";
  $("previewTitle").textContent = fields.guildName.value || "Guild Briefing";
  $("previewDate").textContent = formatDate(fields.warDate.value);
  $("previewTime").textContent = fields.warTime.value || "20:00";

  const subtitle = isSiege
    ? `${fields.territory.value || "Territory"} - ${fields.castleArea.value || "Castle"}`
    : `${fields.region.value || "Region"} - ${fields.nodeName.value || "Node"}`;
  $("previewSubtitle").textContent = subtitle;

  const details = $("detailsList");
  details.innerHTML = "";
  addDetail(details, "Channel", fields.channel.value);
  addDetail(details, "Rally", fields.rallyTime.value);
  addDetail(details, "Caller", fields.shotcaller.value);

  if (isSiege) {
    addDetail(details, "Territory", fields.territory.value);
    addDetail(details, "Castle", fields.castleArea.value);
    addDetail(details, "Allies", fields.allies.value);
  } else {
    addDetail(details, "Region", fields.region.value);
    addDetail(details, "Node", fields.nodeName.value);
    addDetail(details, "Tier", fields.tierRules.value);
    addDetail(details, "Objective", fields.objective.value);
  }

  fillList($("guildList"), splitLines(fields.enemyGuilds.value), "TBD");
  const ruleItems = isSiege
    ? [fields.siegeRules.value, ...splitLines(fields.rules.value)].filter(Boolean)
    : splitLines(fields.rules.value);
  fillList($("rulesList"), ruleItems, "Follow shotcaller calls.");
  $("previewNotes").textContent = fields.notes.value || "No extra notes.";
}

function buildPresetButtons() {
  const row = $("presetRow");
  row.innerHTML = "";
  Object.entries(presets).forEach(([key, preset]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "preset";
    button.textContent = preset.name;
    button.dataset.preset = key;
    button.classList.toggle("is-active", key === activePreset);
    button.addEventListener("click", () => {
      activePreset = key;
      document.querySelectorAll(".preset").forEach((item) => {
        item.classList.toggle("is-active", item.dataset.preset === key);
      });
      applyTheme(preset);
    });
    row.appendChild(button);
  });
}

function setToday() {
  const today = new Date();
  const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  fields.warDate.value = local.toISOString().slice(0, 10);
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function fontName() {
  if (fields.fontFamily.value.includes("Georgia")) return "Georgia";
  if (fields.fontFamily.value.includes("Trebuchet")) return "Trebuchet MS";
  return "Segoe UI";
}

function drawText(ctx, text, x, y, options = {}) {
  const {
    size = 24,
    weight = "700",
    color = "#ffffff",
    maxWidth = 400,
    lineHeight = size * 1.24,
    maxLines = 3,
    uppercase = false
  } = options;
  const value = uppercase ? text.toUpperCase() : text;
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px ${fontName()}`;
  const words = value.split(/\s+/);
  const lines = [];
  let line = "";

  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);

  lines.slice(0, maxLines).forEach((item, index) => {
    const finalLine = index === maxLines - 1 && lines.length > maxLines
      ? `${item.replace(/[.,;:!?]*$/, "")}...`
      : item;
    ctx.fillText(finalLine, x, y + index * lineHeight);
  });
  return y + Math.min(lines.length, maxLines) * lineHeight;
}

function drawCard(ctx, x, y, width, height, title, theme) {
  ctx.fillStyle = rgba(theme.panel, 0.9);
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.stroke();
  drawText(ctx, title, x + 20, y + 36, {
    size: 15,
    weight: "900",
    color: theme.accent,
    maxWidth: width - 40,
    maxLines: 1,
    uppercase: true
  });
}

function drawDetails(ctx, details, x, y, width, theme) {
  let cursor = y;
  details.forEach(([label, value]) => {
    if (!value) return;
    drawText(ctx, label, x, cursor, {
      size: 15,
      weight: "900",
      color: rgba(theme.text, 0.68),
      maxWidth: 110,
      maxLines: 1
    });
    drawText(ctx, value, x + 132, cursor, {
      size: 15,
      weight: "800",
      color: theme.text,
      maxWidth: width - 152,
      maxLines: 2,
      lineHeight: 18
    });
    cursor += value.length > 34 ? 36 : 24;
  });
}

function drawBullets(ctx, items, x, y, width, theme, maxItems = 5, options = {}) {
  const size = options.size || 16;
  const lineHeight = options.lineHeight || 20;
  const gap = options.gap || 6;
  let cursor = y;
  items.slice(0, maxItems).forEach((item) => {
    ctx.fillStyle = theme.accent;
    ctx.beginPath();
    ctx.roundRect(x, cursor - 9, 8, 8, 2);
    ctx.fill();
    cursor = drawText(ctx, item, x + 22, cursor, {
      size,
      weight: "800",
      color: theme.text,
      maxWidth: width - 28,
      maxLines: 2,
      lineHeight
    }) + gap;
  });
}

function loadMapImage() {
  return new Promise((resolve) => {
    if (!mapDataUrl) {
      resolve(null);
      return;
    }
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = mapDataUrl;
  });
}

function drawCoverImage(ctx, image, x, y, width, height) {
  const scale = Math.max(width / image.width, height / image.height);
  const sw = width / scale;
  const sh = height / scale;
  const sx = (image.width - sw) / 2;
  const sy = (image.height - sh) / 2;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 8);
  ctx.clip();
  ctx.drawImage(image, sx, sy, sw, sh, x, y, width, height);
  ctx.restore();
}

async function exportPng() {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 675;
  const ctx = canvas.getContext("2d");
  const theme = getTheme();
  const isSiege = fields.warType.value === "siege";

  const gradient = ctx.createLinearGradient(0, 0, 1200, 675);
  gradient.addColorStop(0, theme.bg);
  gradient.addColorStop(0.55, rgba(theme.accent, 0.16));
  gradient.addColorStop(1, theme.bg);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 675);

  ctx.fillStyle = rgba(theme.accent2, 0.18);
  ctx.beginPath();
  ctx.arc(1030, 85, 260, 0, Math.PI * 2);
  ctx.fill();

  const subtitle = isSiege
    ? `${fields.territory.value || "Territory"} - ${fields.castleArea.value || "Castle"}`
    : `${fields.region.value || "Region"} - ${fields.nodeName.value || "Node"}`;

  drawText(ctx, isSiege ? "Siege Briefing" : "Nodewar Briefing", 48, 68, {
    size: 18,
    weight: "900",
    color: theme.accent,
    maxWidth: 600,
    maxLines: 1,
    uppercase: true
  });
  drawText(ctx, fields.guildName.value || "Guild Briefing", 48, 128, {
    size: 58,
    weight: "900",
    color: theme.text,
    maxWidth: 760,
    lineHeight: 58,
    maxLines: 2
  });
  drawText(ctx, subtitle, 48, 212, {
    size: 22,
    weight: "800",
    color: rgba(theme.text, 0.8),
    maxWidth: 760,
    maxLines: 1
  });

  ctx.fillStyle = "rgba(0,0,0,0.24)";
  ctx.strokeStyle = rgba(theme.accent, 0.5);
  ctx.beginPath();
  ctx.roundRect(960, 42, 190, 86, 8);
  ctx.fill();
  ctx.stroke();
  ctx.textAlign = "right";
  drawText(ctx, formatDate(fields.warDate.value), 1130, 76, {
    size: 16,
    weight: "800",
    color: rgba(theme.text, 0.82),
    maxWidth: 170,
    maxLines: 1
  });
  drawText(ctx, fields.warTime.value || "20:00", 1130, 110, {
    size: 28,
    weight: "900",
    color: theme.accent,
    maxWidth: 170,
    maxLines: 1
  });
  ctx.textAlign = "left";

  drawCard(ctx, 48, 240, 420, 205, "War Details", theme);
  drawCard(ctx, 484, 240, 246, 205, "Teamfights", theme);
  drawCard(ctx, 48, 461, 682, 105, "Rules", theme);
  drawCard(ctx, 48, 582, 682, 58, "Notes", theme);
  drawCard(ctx, 746, 240, 406, 400, mapDataUrl ? "Map" : "Map Pending", theme);

  const details = [
    ["Channel", fields.channel.value],
    ["Rally", fields.rallyTime.value],
    ["Caller", fields.shotcaller.value],
    ...(isSiege
      ? [["Territory", fields.territory.value], ["Castle", fields.castleArea.value], ["Allies", fields.allies.value]]
      : [["Region", fields.region.value], ["Node", fields.nodeName.value], ["Tier", fields.tierRules.value], ["Objective", fields.objective.value]])
  ];
  const canvasRules = isSiege
    ? [fields.siegeRules.value, ...splitLines(fields.rules.value)].filter(Boolean)
    : splitLines(fields.rules.value);
  drawDetails(ctx, details, 68, 292, 380, theme);
  drawBullets(ctx, splitLines(fields.enemyGuilds.value), 506, 310, 200, theme, 4);
  drawBullets(ctx, canvasRules, 70, 496, 620, theme, 4, {
    size: 14,
    lineHeight: 17,
    gap: 3
  });
  drawText(ctx, fields.notes.value || "No extra notes.", 68, 624, {
    size: 15,
    weight: "800",
    color: theme.text,
    maxWidth: 632,
    maxLines: 1
  });

  const mapImage = await loadMapImage();
  if (mapImage) {
    drawCoverImage(ctx, mapImage, 766, 292, 366, 328);
  } else {
    drawText(ctx, "Map Pending", 850, 444, {
      size: 28,
      weight: "900",
      color: theme.accent,
      maxWidth: 230,
      maxLines: 1,
      uppercase: true
    });
    drawText(ctx, "Add a map when one is available", 824, 482, {
      size: 17,
      weight: "800",
      color: rgba(theme.text, 0.76),
      maxWidth: 280,
      maxLines: 1
    });
  }

  const link = document.createElement("a");
  const type = isSiege ? "siege" : "nodewar";
  link.download = `${type}-announcement-${fields.warDate.value || "today"}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function saveTheme() {
  const theme = getTheme();
  localStorage.setItem("bdo-war-announcement-theme", JSON.stringify(theme));
  activePreset = "custom";
}

function loadSavedTheme() {
  const saved = localStorage.getItem("bdo-war-announcement-theme");
  if (!saved) return false;
  try {
    applyTheme(JSON.parse(saved));
    return true;
  } catch {
    return false;
  }
}

function resetApp() {
  localStorage.removeItem("bdo-war-announcement-theme");
  activePreset = "command";
  applyTheme(presets.command);
  document.querySelectorAll(".preset").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.preset === activePreset);
  });
}

Object.values(fields).forEach((field) => {
  field.addEventListener("input", updatePreview);
  field.addEventListener("change", updatePreview);
});

$("mapInput").addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    mapDataUrl = reader.result;
    $("mapPreview").src = mapDataUrl;
    $("mapPreview").parentElement.classList.add("has-map");
  };
  reader.readAsDataURL(file);
});

$("clearMap").addEventListener("click", () => {
  mapDataUrl = "";
  $("mapInput").value = "";
  $("mapPreview").removeAttribute("src");
  $("mapPreview").parentElement.classList.remove("has-map");
});

$("downloadBtn").addEventListener("click", () => {
  exportPng().catch((error) => {
    console.error(error);
    alert("PNG export failed. Try a smaller map image or use a Chromium-based browser.");
  });
});

$("saveThemeBtn").addEventListener("click", saveTheme);
$("resetBtn").addEventListener("click", resetApp);

setToday();
buildPresetButtons();
if (!loadSavedTheme()) applyTheme(presets.command);
updatePreview();
