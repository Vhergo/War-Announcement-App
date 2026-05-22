const $ = (id) => document.getElementById(id);

const DEFAULT_RULES = `Start on base
Clear sticks
2 mins to upgrade then live
No town spawn
No OOZ/Safezone/Red zone cannons/abuse
No base cannons [ Hwacha render 150m ]
No iframe CTG
No Boats
No flags in red zone
1 Cannon Per Fort`;

const fields = {
  warType: $("warType"),
  guildName: $("guildName"),
  warDate: $("warDate"),
  warTime: $("warTime"),
  timeZone: $("timeZone"),
  channel: $("channel"),
  regionServer: $("regionServer"),
  nodeName: $("nodeName"),
  tierRules: $("tierRules"),
  capDisplay: $("capDisplay"),
  territory: $("territory"),
  castleArea: $("castleArea"),
  siegeRules: $("siegeRules"),
  allies: $("allies"),
  teamOneGuilds: $("teamOneGuilds"),
  teamTwoGuilds: $("teamTwoGuilds"),
  rules: $("rules"),
  separateMap: $("separateMap"),
  mapPlacement: $("mapPlacement"),
  separateOrder: $("separateOrder"),
  accentColor: $("accentColor"),
  accentTwoColor: $("accentTwoColor"),
  backgroundColor: $("backgroundColor"),
  panelColor: $("panelColor"),
  textColor: $("textColor"),
  fontFamily: $("fontFamily"),
  layoutTopPadding: $("layoutTopPadding"),
  layoutTitleSize: $("layoutTitleSize"),
  layoutTeamSize: $("layoutTeamSize"),
  layoutLeftWidth: $("layoutLeftWidth"),
  layoutDetailsHeight: $("layoutDetailsHeight"),
  layoutRulesHeight: $("layoutRulesHeight"),
  layoutPanelGap: $("layoutPanelGap"),
  layoutRulesFont: $("layoutRulesFont"),
  layoutRulesSpacing: $("layoutRulesSpacing"),
  layoutMapFit: $("layoutMapFit")
};

const TIER_CAPS = {
  "T1 Capped": "T1 Capped",
  "T2 Capped": "T2 Capped",
  "Uncapped": "Uncapped"
};

const DEFAULT_LAYOUT = {
  topPadding: 32,
  titleSize: 54,
  teamSize: 18,
  leftWidth: 565,
  detailsHeight: 176,
  rulesHeight: 454,
  panelGap: 22,
  rulesFont: 20,
  rulesSpacing: 5,
  mapFit: "cover"
};

const BUNDLED_WAR_SCHEDULE = [
  {
    "date": "monday",
    "node": "Calpheon",
    "server": "Calpheon",
    "tier": "T2 Capped",
    "cap": "35"
  },
  {
    "date": "monday",
    "node": "Ulukita",
    "server": "Ulukita",
    "tier": "T2 Capped",
    "cap": "45"
  },
  {
    "date": "monday",
    "node": "Valencia",
    "server": "Valencia",
    "tier": "Uncapped",
    "cap": "55"
  },
  {
    "date": "monday",
    "node": "Edania",
    "server": "Edania",
    "tier": "Uncapped",
    "cap": "60"
  },
  {
    "date": "monday",
    "node": "Balenos",
    "server": "Balenos",
    "tier": "T1 Capped",
    "cap": "25"
  },
  {
    "date": "monday",
    "node": "Serendia",
    "server": "Serendia",
    "tier": "T1 Capped",
    "cap": "25"
  },
  {
    "date": "tuesday",
    "node": "Calpheon",
    "server": "Calpheon",
    "tier": "T2 Capped",
    "cap": "45"
  },
  {
    "date": "tuesday",
    "node": "Ulukita",
    "server": "Ulukita",
    "tier": "T2 Capped",
    "cap": "35"
  },
  {
    "date": "tuesday",
    "node": "Valencia",
    "server": "Valencia",
    "tier": "Uncapped",
    "cap": "60"
  },
  {
    "date": "tuesday",
    "node": "Edania",
    "server": "Edania",
    "tier": "Uncapped",
    "cap": "50"
  },
  {
    "date": "tuesday",
    "node": "Balenos",
    "server": "Balenos",
    "tier": "T1 Capped",
    "cap": "30"
  },
  {
    "date": "tuesday",
    "node": "Serendia",
    "server": "Serendia",
    "tier": "T1 Capped",
    "cap": "30"
  },
  {
    "date": "wednesday",
    "node": "Calpheon",
    "server": "Calpheon",
    "tier": "T2 Capped",
    "cap": "40"
  },
  {
    "date": "wednesday",
    "node": "Ulukita",
    "server": "Ulukita",
    "tier": "T2 Capped",
    "cap": "50"
  },
  {
    "date": "wednesday",
    "node": "Valencia",
    "server": "Valencia",
    "tier": "Uncapped",
    "cap": "60"
  },
  {
    "date": "wednesday",
    "node": "Edania",
    "server": "Edania",
    "tier": "Uncapped",
    "cap": "75"
  },
  {
    "date": "wednesday",
    "node": "Balenos",
    "server": "Balenos",
    "tier": "T1 Capped",
    "cap": "25"
  },
  {
    "date": "wednesday",
    "node": "Serendia",
    "server": "Serendia",
    "tier": "T1 Capped",
    "cap": "25"
  },
  {
    "date": "thursday",
    "node": "Calpheon",
    "server": "Calpheon",
    "tier": "T2 Capped",
    "cap": "40"
  },
  {
    "date": "thursday",
    "node": "Ulukita",
    "server": "Ulukita",
    "tier": "T2 Capped",
    "cap": "30"
  },
  {
    "date": "thursday",
    "node": "Valencia",
    "server": "Valencia",
    "tier": "Uncapped",
    "cap": "60"
  },
  {
    "date": "thursday",
    "node": "Edania",
    "server": "Edania",
    "tier": "Uncapped",
    "cap": "50"
  },
  {
    "date": "thursday",
    "node": "Balenos",
    "server": "Balenos",
    "tier": "T1 Capped",
    "cap": "30"
  },
  {
    "date": "thursday",
    "node": "Serendia",
    "server": "Serendia",
    "tier": "T1 Capped",
    "cap": "30"
  },
  {
    "date": "friday",
    "node": "Calpheon",
    "server": "Calpheon",
    "tier": "T2 Capped",
    "cap": "50"
  },
  {
    "date": "friday",
    "node": "Ulukita",
    "server": "Ulukita",
    "tier": "T2 Capped",
    "cap": "40"
  },
  {
    "date": "friday",
    "node": "Valencia",
    "server": "Valencia",
    "tier": "Uncapped",
    "cap": "75"
  },
  {
    "date": "friday",
    "node": "Edania",
    "server": "Edania",
    "tier": "Uncapped",
    "cap": "60"
  },
  {
    "date": "friday",
    "node": "Balenos",
    "server": "Balenos",
    "tier": "T1 Capped",
    "cap": "25"
  },
  {
    "date": "friday",
    "node": "Serendia",
    "server": "Serendia",
    "tier": "T1 Capped",
    "cap": "25"
  },
  {
    "date": "saturday",
    "node": "Calpheon",
    "server": "Calpheon",
    "tier": "T2 Capped",
    "cap": "100"
  },
  {
    "date": "saturday",
    "node": "Ulukita",
    "server": "Ulukita",
    "tier": "T2 Capped",
    "cap": "100"
  },
  {
    "date": "saturday",
    "node": "Valencia",
    "server": "Valencia",
    "tier": "Uncapped",
    "cap": "100"
  },
  {
    "date": "saturday",
    "node": "Edania",
    "server": "Edania",
    "tier": "Uncapped",
    "cap": "100"
  },
  {
    "date": "saturday",
    "node": "Balenos",
    "server": "Balenos",
    "tier": "T1 Capped",
    "cap": "100"
  },
  {
    "date": "saturday",
    "node": "Serendia",
    "server": "Serendia",
    "tier": "T1 Capped",
    "cap": "100"
  },
  {
    "date": "sunday",
    "node": "Calpheon",
    "server": "Calpheon",
    "tier": "T2 Capped",
    "cap": "55"
  },
  {
    "date": "sunday",
    "node": "Ulukita",
    "server": "Ulukita",
    "tier": "T2 Capped",
    "cap": "45"
  },
  {
    "date": "sunday",
    "node": "Valencia",
    "server": "Valencia",
    "tier": "Uncapped",
    "cap": "80"
  },
  {
    "date": "sunday",
    "node": "Edania",
    "server": "Edania",
    "tier": "Uncapped",
    "cap": "65"
  },
  {
    "date": "sunday",
    "node": "Balenos",
    "server": "Balenos",
    "tier": "T1 Capped",
    "cap": "30"
  },
  {
    "date": "sunday",
    "node": "Serendia",
    "server": "Serendia",
    "tier": "T1 Capped",
    "cap": "30"
  }
];

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
  },
  emerald: {
    name: "Emerald",
    accent: "#8bdc9f",
    accent2: "#d7b56d",
    bg: "#101915",
    panel: "#1d2a23",
    text: "#effaf1",
    font: "Verdana, Geneva, sans-serif"
  },
  obsidian: {
    name: "Obsidian",
    accent: "#e6e0d3",
    accent2: "#8a5cff",
    bg: "#090a0e",
    panel: "#171820",
    text: "#f7f3eb",
    font: "'Arial Black', Impact, sans-serif"
  },
  tactical: {
    name: "Tactical",
    accent: "#7cffd3",
    accent2: "#ff6a3d",
    bg: "#0c1211",
    panel: "#16201e",
    text: "#eafff8",
    font: "'Courier New', Courier, monospace"
  }
};

let activePreset = "command";
let mapDataUrl = "";
let scheduleRows = BUNDLED_WAR_SCHEDULE;

function splitLines(value) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getWeekdayKey(dateValue) {
  if (!dateValue) return "";
  const date = new Date(`${dateValue}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date).toLowerCase();
}

function getRowsForSelectedDate() {
  if (!fields.warDate.value) return [];
  const exact = scheduleRows.filter((row) => row.date === fields.warDate.value);
  if (exact.length) return exact;
  const weekday = getWeekdayKey(fields.warDate.value);
  return scheduleRows.filter((row) => row.date === weekday);
}

function updateNodeOptions() {
  if (fields.warType.value !== "nodewar") return;
  const dateRows = getRowsForSelectedDate();
  const current = fields.regionServer.value;
  fields.regionServer.innerHTML = "";
  if (!fields.warDate.value || !dateRows.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = fields.warDate.value ? "No regions available" : "Select date first";
    fields.regionServer.appendChild(option);
    fields.capDisplay.value = "";
    return;
  }
  dateRows.forEach((row) => {
    const option = document.createElement("option");
    option.value = row.node;
    option.textContent = row.node;
    fields.regionServer.appendChild(option);
  });
  if (dateRows.some((row) => row.node === current)) fields.regionServer.value = current;
  updateCapFromSelection();
}

function updateCapFromSelection() {
  const selected = getRowsForSelectedDate().find((row) => row.node === fields.regionServer.value);
  if (selected) {
    fields.channel.value = `${selected.server || selected.node} 1`;
    if (selected.tier && [...fields.tierRules.options].some((option) => option.value === selected.tier)) {
      fields.tierRules.value = selected.tier;
    }
    fields.capDisplay.value = selected.cap || selected.tier || TIER_CAPS[fields.tierRules.value] || fields.tierRules.value;
    return;
  }
  fields.capDisplay.value = TIER_CAPS[fields.tierRules.value] || fields.tierRules.value;
}

function getTheme() {
  return {
    accent: fields.accentColor.value,
    accent2: fields.accentTwoColor.value,
    bg: fields.backgroundColor.value,
    panel: fields.panelColor.value,
    text: fields.textColor.value,
    font: fields.fontFamily.value
  };
}

function applyTheme(theme) {
  fields.accentColor.value = theme.accent;
  fields.accentTwoColor.value = theme.accent2;
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

function getZonedDateParts(date, time, sourceTimeZone) {
  if (!date || !time) return null;
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: sourceTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  const parts = Object.fromEntries(formatter.formatToParts(new Date(utcGuess)).map((part) => [part.type, part.value]));
  const zonedAsUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute)
  );
  return new Date(utcGuess + (utcGuess - zonedAsUtc));
}

function formatTimeForZone(date, timeZone, label) {
  const value = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
  return `${value} ${label}`;
}

function getTimeSummary() {
  const date = getZonedDateParts(fields.warDate.value, fields.warTime.value, fields.timeZone.value);
  if (!date) return "Time TBD";
  return `${formatTimeForZone(date, "America/Los_Angeles", "PST")} / ${formatTimeForZone(date, "America/New_York", "EST")}`;
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

function getWarLocation() {
  const isSiege = fields.warType.value === "siege";
  return isSiege
    ? [fields.territory.value || "Territory", fields.castleArea.value || "Castle"]
    : [fields.nodeName.value || "Node TBD", fields.channel.value || "Server TBD"];
}

function getMapTitle() {
  const isSiege = fields.warType.value === "siege";
  return isSiege ? fields.castleArea.value || fields.territory.value || "Siege Map" : fields.nodeName.value || fields.regionServer.value || "Node Map";
}

function getDetails() {
  const isSiege = fields.warType.value === "siege";
  const details = [
    ["Server", fields.channel.value]
  ];
  if (isSiege) {
    details.push(["Territory", fields.territory.value], ["Castle", fields.castleArea.value], ["Allies", fields.allies.value]);
  } else {
    details.push(
      ["Node", fields.nodeName.value],
      ["Region", fields.regionServer.value],
      ["Tier", fields.tierRules.value],
      ["Cap", fields.capDisplay.value || TIER_CAPS[fields.tierRules.value] || fields.tierRules.value]
    );
  }
  return details.filter(([, value]) => value);
}

function getTeamLine() {
  const left = splitLines(fields.teamOneGuilds.value).join(" | ") || "Team One";
  const right = splitLines(fields.teamTwoGuilds.value).join(" | ") || "Team Two";
  return `${left} vs ${right}`;
}

function getLayout() {
  return {
    topPadding: Number(fields.layoutTopPadding.value),
    titleSize: Number(fields.layoutTitleSize.value),
    teamSize: Number(fields.layoutTeamSize.value),
    leftWidth: Number(fields.layoutLeftWidth.value),
    detailsHeight: Number(fields.layoutDetailsHeight.value),
    rulesHeight: Number(fields.layoutRulesHeight.value),
    panelGap: Number(fields.layoutPanelGap.value),
    rulesFont: Number(fields.layoutRulesFont.value),
    rulesSpacing: Number(fields.layoutRulesSpacing.value),
    mapFit: fields.layoutMapFit.value
  };
}

function applyLayout(layout) {
  const next = { ...DEFAULT_LAYOUT, ...layout };
  fields.layoutTopPadding.value = next.topPadding;
  fields.layoutTitleSize.value = next.titleSize;
  fields.layoutTeamSize.value = next.teamSize;
  fields.layoutLeftWidth.value = next.leftWidth;
  fields.layoutDetailsHeight.value = next.detailsHeight;
  fields.layoutRulesHeight.value = next.rulesHeight;
  fields.layoutPanelGap.value = next.panelGap;
  fields.layoutRulesFont.value = next.rulesFont;
  fields.layoutRulesSpacing.value = next.rulesSpacing;
  fields.layoutMapFit.value = next.mapFit;
  syncLayout();
  updatePreview();
}

function syncLayout() {
  const layout = getLayout();
  const announcement = $("announcement");
  announcement.style.setProperty("--layout-top-padding", `${layout.topPadding}px`);
  announcement.style.setProperty("--layout-title-size", `${layout.titleSize}px`);
  announcement.style.setProperty("--layout-team-size", `${layout.teamSize}px`);
  announcement.style.setProperty("--layout-left-width", `${layout.leftWidth}px`);
  announcement.style.setProperty("--layout-details-height", `${layout.detailsHeight}px`);
  announcement.style.setProperty("--layout-rules-height", `${layout.rulesHeight}px`);
  announcement.style.setProperty("--layout-panel-gap", `${layout.panelGap}px`);
  announcement.style.setProperty("--layout-rules-font", `${layout.rulesFont}px`);
  announcement.style.setProperty("--layout-rules-gap", `${layout.rulesSpacing}px`);
  announcement.style.setProperty("--layout-map-fit", layout.mapFit);
}

function renderTeamLine(element, maxFont = 18, minFont = 12) {
  const leftGuilds = splitLines(fields.teamOneGuilds.value);
  const rightGuilds = splitLines(fields.teamTwoGuilds.value);
  element.innerHTML = "";

  const addSide = (guilds, sideClass) => {
    guilds.forEach((guild, index) => {
      if (index > 0) {
        const divider = document.createElement("span");
        divider.className = "guild-divider";
        divider.textContent = "|";
        element.appendChild(divider);
      }
      const span = document.createElement("span");
      span.className = `guild-name ${sideClass}`;
      span.textContent = guild;
      element.appendChild(span);
    });
  };

  addSide(leftGuilds.length ? leftGuilds : ["Team One"], "left-side");
  const vs = document.createElement("span");
  vs.className = "guild-vs";
  vs.textContent = "vs";
  element.appendChild(vs);
  addSide(rightGuilds.length ? rightGuilds : ["Team Two"], "right-side");

  element.style.fontSize = `${maxFont}px`;
  requestAnimationFrame(() => {
    let size = maxFont;
    while (element.scrollWidth > element.clientWidth && size > minFont) {
      size -= 1;
      element.style.fontSize = `${size}px`;
    }
  });
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

function getRules() {
  const isSiege = fields.warType.value === "siege";
  const rules = splitLines(fields.rules.value || DEFAULT_RULES);
  return isSiege && fields.siegeRules.value ? [fields.siegeRules.value, ...rules] : rules;
}

function updateWarFields() {
  const isSiege = fields.warType.value === "siege";
  const shouldShowNodewar = !isSiege && Boolean(fields.warDate.value);
  $("nodewarFields").classList.toggle("is-hidden", !shouldShowNodewar);
  $("nodewarPrompt").classList.toggle("is-hidden", isSiege || Boolean(fields.warDate.value));
  $("siegeFields").classList.toggle("is-hidden", !isSiege);
}

function updatePreview() {
  updateWarFields();
  if (fields.warType.value === "nodewar") updateNodeOptions();
  updateCapFromSelection();
  syncExportTheme();
  syncLayout();

  const isSiege = fields.warType.value === "siege";
  const [primaryLocation, secondaryLocation] = getWarLocation();
  const announcement = $("announcement");
  announcement.classList.toggle("map-bottom", fields.mapPlacement.value === "bottom" && !fields.separateMap.checked);
  announcement.classList.toggle("map-side", fields.mapPlacement.value === "side" && !fields.separateMap.checked);
  announcement.classList.toggle("map-separated", fields.separateMap.checked);

  $("previewTitle").textContent = fields.guildName.value || "Guild Briefing";
  $("previewSubtitle").textContent = isSiege
    ? `${primaryLocation} - ${secondaryLocation} - ${fields.channel.value || "Server TBD"}`
    : `${primaryLocation} - ${secondaryLocation}`;
  renderTeamLine($("previewTeamLine"), getLayout().teamSize, 10);
  $("previewDateOnly").textContent = fields.warDate.value ? formatDate(fields.warDate.value) : "Select Date";
  $("previewTimeOnly").textContent = getTimeSummary();

  const details = $("detailsList");
  details.innerHTML = "";
  getDetails().forEach(([label, value]) => addDetail(details, label, value));

  fillList($("rulesList"), getRules(), "Follow war calls.");

  $("mapPlacement").disabled = fields.separateMap.checked;
  $("separateOrder").disabled = !fields.separateMap.checked;
  $("previewWrap").classList.toggle("show-separated", fields.separateMap.checked);
  $("previewWrap").classList.toggle("preview-map-active", fields.separateMap.checked && fields.separateOrder.value === "map");
  $("previewWrap").classList.toggle("preview-post-active", fields.separateMap.checked && fields.separateOrder.value !== "map");
  $("separateMapTitle").textContent = getMapTitle();
  $("separateMapTeams").textContent = getTeamLine();
  setPreviewScale();
}

function setPreviewScale() {
  const panel = document.querySelector(".preview-panel");
  const announcement = $("announcement");
  if (!panel || !announcement) return;
  const isSeparated = fields.separateMap.checked;
  const mapPreviewActive = isSeparated && fields.separateOrder.value === "map";
  const targetWidth = mapPreviewActive ? 1200 : isSeparated ? 1000 : 1400;
  const targetHeight = mapPreviewActive ? 760 : announcement.classList.contains("map-bottom") ? 1220 : 940;
  const scaleByWidth = (panel.clientWidth - 48) / targetWidth;
  const scaleByHeight = (window.innerHeight - 72) / targetHeight;
  const scale = Math.min(1, Math.max(0.42, Math.min(scaleByWidth, scaleByHeight)));
  announcement.style.setProperty("--preview-zoom", String(scale));
  $("separateMapPreview").style.setProperty("--preview-zoom", String(Math.min(1, Math.max(0.42, scale))));
}

function buildPresetButtons() {
  const row = $("presetRow");
  row.innerHTML = "";
  Object.entries(presets).forEach(([key, preset]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "preset";
    button.dataset.preset = key;
    button.style.setProperty("--preset-accent", preset.accent);
    button.style.setProperty("--preset-accent-2", preset.accent2);
    button.style.setProperty("--preset-bg", preset.bg);
    button.style.setProperty("--preset-text", preset.text);
    button.style.fontFamily = preset.font;
    button.innerHTML = `<span>${preset.name}</span><small>Aa</small>`;
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

function resetTheme() {
  localStorage.removeItem("bdo-war-announcement-theme");
  activePreset = "command";
  applyTheme(presets.command);
  document.querySelectorAll(".preset").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.preset === activePreset);
  });
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

function canvasFont() {
  if (fields.fontFamily.value.includes("Georgia")) return "Georgia";
  if (fields.fontFamily.value.includes("Trebuchet")) return "Trebuchet MS";
  if (fields.fontFamily.value.includes("Verdana")) return "Verdana";
  if (fields.fontFamily.value.includes("Arial Black")) return "Arial Black";
  if (fields.fontFamily.value.includes("Courier")) return "Courier New";
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
    uppercase = false,
    align = "left"
  } = options;
  const value = uppercase ? String(text).toUpperCase() : String(text);
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.font = `${weight} ${size}px ${canvasFont()}`;
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
  ctx.fillStyle = rgba(theme.panel, 0.92);
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 8);
  ctx.fill();
  ctx.stroke();
  drawText(ctx, title, x + 22, y + 38, {
    size: 16,
    weight: "900",
    color: theme.accent,
    maxWidth: width - 44,
    maxLines: 1,
    uppercase: true
  });
}

function drawDetails(ctx, details, x, y, width, theme) {
  let cursor = y;
  details.forEach(([label, value]) => {
    drawText(ctx, label, x, cursor, {
      size: 16,
      weight: "900",
      color: rgba(theme.text, 0.66),
      maxWidth: 105,
      maxLines: 1
    });
    const next = drawText(ctx, value, x + 122, cursor, {
      size: 16,
      weight: "800",
      color: theme.text,
      maxWidth: width - 142,
      maxLines: 2,
      lineHeight: 20
    });
    cursor = Math.max(cursor + 26, next + 5);
  });
}

function drawBullets(ctx, items, x, y, width, theme, maxItems, options = {}) {
  const size = options.size || 15;
  const lineHeight = options.lineHeight || 18;
  const gap = options.gap || 5;
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
      maxWidth: width - 26,
      maxLines: options.maxLines || 2,
      lineHeight
    }) + gap;
  });
}

function drawTeamColumn(ctx, title, items, x, y, width, theme) {
  drawText(ctx, title, x, y, {
    size: 19,
    weight: "900",
    color: theme.accent,
    maxWidth: width,
    maxLines: 1
  });
  drawBullets(ctx, items, x, y + 36, width, theme, 6, {
    size: 15,
    lineHeight: 18,
    gap: 4,
    maxLines: 1
  });
}

function saveLayout() {
  localStorage.setItem("bdo-war-announcement-layout", JSON.stringify(getLayout()));
}

function loadSavedLayout() {
  const saved = localStorage.getItem("bdo-war-announcement-layout");
  if (!saved) return false;
  try {
    applyLayout(JSON.parse(saved));
    return true;
  } catch {
    return false;
  }
}

function resetLayout() {
  localStorage.removeItem("bdo-war-announcement-layout");
  applyLayout(DEFAULT_LAYOUT);
}

function drawTeamLine(ctx, x, y, width, theme, maxSize = 18, minSize = 12) {
  const left = splitLines(fields.teamOneGuilds.value);
  const right = splitLines(fields.teamTwoGuilds.value);
  const segments = [];
  const addGuilds = (guilds, color) => {
    guilds.forEach((guild, index) => {
      if (index > 0) segments.push({ text: " | ", color: rgba(theme.text, 0.48) });
      segments.push({ text: guild, color });
    });
  };
  addGuilds(left.length ? left : ["Team One"], theme.accent);
  segments.push({ text: "  vs  ", color: theme.accent2 });
  addGuilds(right.length ? right : ["Team Two"], theme.text);

  let size = maxSize;
  do {
    ctx.font = `900 ${size}px ${canvasFont()}`;
    const total = segments.reduce((sum, segment) => sum + ctx.measureText(segment.text).width, 0);
    if (total <= width || size <= minSize) break;
    size -= 1;
  } while (size > minSize);

  ctx.font = `900 ${size}px ${canvasFont()}`;
  let cursor = x;
  segments.forEach((segment) => {
    ctx.fillStyle = segment.color;
    ctx.fillText(segment.text, cursor, y);
    cursor += ctx.measureText(segment.text).width;
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

function drawContainImage(ctx, image, x, y, width, height) {
  const scale = Math.min(width / image.width, height / image.height);
  const dw = image.width * scale;
  const dh = image.height * scale;
  const dx = x + (width - dw) / 2;
  const dy = y + (height - dh) / 2;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 8);
  ctx.clip();
  ctx.fillStyle = "rgba(0,0,0,0.24)";
  ctx.fillRect(x, y, width, height);
  ctx.drawImage(image, dx, dy, dw, dh);
  ctx.restore();
}

function drawFillImage(ctx, image, x, y, width, height) {
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

function drawBackground(ctx, width, height, theme) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, theme.bg);
  gradient.addColorStop(0.58, rgba(theme.accent, 0.14));
  gradient.addColorStop(1, theme.bg);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = rgba(theme.accent2, 0.18);
  ctx.beginPath();
  ctx.arc(width * 0.84, 90, 320, 0, Math.PI * 2);
  ctx.fill();
}

function makeCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

async function renderAnnouncementCanvas(includeMap) {
  const mapBottom = fields.mapPlacement.value === "bottom" && includeMap;
  const width = includeMap ? 1400 : 1000;
  const height = mapBottom ? 1220 : 940;
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const theme = getTheme();
  const layout = getLayout();
  const isSiege = fields.warType.value === "siege";
  const [primaryLocation, secondaryLocation] = getWarLocation();
  const mapImage = includeMap ? await loadMapImage() : null;
  const details = getDetails();
  const rules = getRules();

  drawBackground(ctx, width, height, theme);

  const titleY = layout.topPadding + layout.titleSize;
  const subtitleY = titleY + Math.round(layout.titleSize * 0.95);
  const teamY = subtitleY + 40;

  drawText(ctx, fields.guildName.value || "Guild Briefing", 48, titleY, {
    size: layout.titleSize,
    weight: "900",
    color: theme.text,
    maxWidth: width - 460,
    lineHeight: layout.titleSize,
    maxLines: 2
  });
  const subtitle = isSiege
    ? `${primaryLocation} - ${secondaryLocation} - ${fields.channel.value || "Server TBD"}`
    : `${primaryLocation} - ${secondaryLocation}`;
  drawText(ctx, subtitle, 48, subtitleY, {
    size: 22,
    weight: "800",
    color: rgba(theme.text, 0.82),
    maxWidth: 820,
    maxLines: 1
  });
  drawTeamLine(ctx, 48, teamY, width - 96, theme, layout.teamSize, 10);

  ctx.fillStyle = "rgba(0,0,0,0.24)";
  ctx.strokeStyle = rgba(theme.accent, 0.52);
  ctx.beginPath();
  ctx.roundRect(width - 420, 38, 372, 78, 8);
  ctx.fill();
  ctx.stroke();
  drawText(ctx, formatDate(fields.warDate.value), width - 68, 75, {
    size: 18,
    weight: "900",
    color: theme.accent,
    maxWidth: 340,
    maxLines: 1,
    align: "right"
  });
  drawText(ctx, getTimeSummary(), width - 68, 109, {
    size: 20,
    weight: "900",
    color: theme.accent,
    maxWidth: 340,
    maxLines: 1,
    align: "right"
  });

  const contentRight = includeMap && !mapBottom ? 48 + layout.leftWidth : width - 48;
  const leftWidth = contentRight - 48;
  const detailsY = Math.max(teamY + 30, 246);
  const rulesY = detailsY + layout.detailsHeight + layout.panelGap;

  drawCard(ctx, 48, detailsY, leftWidth, layout.detailsHeight, "War Details", theme);
  drawCard(ctx, 48, rulesY, leftWidth, layout.rulesHeight, "Rules", theme);

  drawDetails(ctx, details, 70, detailsY + 52, leftWidth - 44, theme);
  drawBullets(ctx, rules, 72, rulesY + 56, leftWidth - 48, theme, 12, {
    size: layout.rulesFont,
    lineHeight: layout.rulesFont + 6,
    gap: layout.rulesSpacing,
    maxLines: 1
  });

  if (includeMap) {
    if (mapBottom) {
      const mapY = rulesY + layout.rulesHeight + layout.panelGap;
      drawCard(ctx, 48, mapY, width - 96, 244, getMapTitle(), theme);
      if (mapImage) {
        if (layout.mapFit === "contain") drawContainImage(ctx, mapImage, 48, mapY, width - 96, 244);
        else drawFillImage(ctx, mapImage, 48, mapY, width - 96, 244);
      } else {
        drawText(ctx, "Map Pending", 590, mapY + 120, {
          size: 30,
          weight: "900",
          color: theme.accent,
          maxWidth: 240,
          maxLines: 1,
          uppercase: true
        });
      }
    } else {
      const mapX = 48 + layout.leftWidth + 30;
      const mapWidth = width - mapX - 48;
      drawCard(ctx, mapX, detailsY, mapWidth, layout.detailsHeight + layout.panelGap + layout.rulesHeight, getMapTitle(), theme);
      if (mapImage) {
        if (layout.mapFit === "contain") drawContainImage(ctx, mapImage, mapX, detailsY, mapWidth, layout.detailsHeight + layout.panelGap + layout.rulesHeight);
        else drawFillImage(ctx, mapImage, mapX, detailsY, mapWidth, layout.detailsHeight + layout.panelGap + layout.rulesHeight);
      } else {
        drawText(ctx, "Map Pending", mapX + mapWidth / 2 - 90, detailsY + (layout.detailsHeight + layout.panelGap + layout.rulesHeight) / 2, {
          size: 30,
          weight: "900",
          color: theme.accent,
          maxWidth: 240,
          maxLines: 1,
          uppercase: true
        });
      }
    }
  }

  return canvas;
}

async function renderMapCanvas() {
  const width = 1200;
  const height = 760;
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const theme = getTheme();
  const mapImage = await loadMapImage();

  drawBackground(ctx, width, height, theme);
  drawText(ctx, getMapTitle(), 52, 78, {
    size: 48,
    weight: "900",
    color: theme.text,
    maxWidth: 740,
    maxLines: 1
  });
  drawText(ctx, getTeamLine(), 52, 126, {
    size: 24,
    weight: "900",
    color: theme.accent,
    maxWidth: 860,
    maxLines: 1
  });
  drawCard(ctx, 52, 162, 1096, 546, "Map", theme);
  if (mapImage) {
    drawContainImage(ctx, mapImage, 52, 162, 1096, 546);
  } else {
    drawText(ctx, "Map Pending", 454, 438, {
      size: 36,
      weight: "900",
      color: theme.accent,
      maxWidth: 320,
      maxLines: 1,
      uppercase: true
    });
  }
  return canvas;
}

function downloadCanvas(canvas, filename) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

async function exportPng() {
  const type = fields.warType.value === "siege" ? "siege" : "nodewar";
  const date = fields.warDate.value || "today";
  if (fields.separateMap.checked) {
    downloadCanvas(await renderAnnouncementCanvas(false), `${type}-announcement-${date}.png`);
    downloadCanvas(await renderMapCanvas(), `${type}-map-${date}.png`);
    return;
  }
  downloadCanvas(await renderAnnouncementCanvas(true), `${type}-announcement-${date}.png`);
}

Object.values(fields).forEach((field) => {
  field.addEventListener("input", updatePreview);
  field.addEventListener("change", updatePreview);
});

fields.warDate.addEventListener("change", () => {
  updateNodeOptions();
  updatePreview();
});

fields.regionServer.addEventListener("change", () => {
  updateCapFromSelection();
  updatePreview();
});

fields.tierRules.addEventListener("change", () => {
  updateCapFromSelection();
  updatePreview();
});

$("mapInput").addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    mapDataUrl = reader.result;
    $("mapPreview").src = mapDataUrl;
    $("separateMapImage").src = mapDataUrl;
    $("mapPreview").parentElement.classList.add("has-map");
    $("separateMapPreview").classList.add("has-map");
  };
  reader.readAsDataURL(file);
});

$("clearMap").addEventListener("click", () => {
  mapDataUrl = "";
  $("mapInput").value = "";
  $("mapPreview").removeAttribute("src");
  $("separateMapImage").removeAttribute("src");
  $("mapPreview").parentElement.classList.remove("has-map");
  $("separateMapPreview").classList.remove("has-map");
});

$("downloadBtn").addEventListener("click", () => {
  exportPng().catch((error) => {
    console.error(error);
    alert("PNG export failed. Try a smaller map image or use a Chromium-based browser.");
  });
});

$("settingsBtn").addEventListener("click", () => $("settingsDialog").showModal());
$("closeSettingsBtn").addEventListener("click", () => $("settingsDialog").close());
$("saveThemeBtn").addEventListener("click", saveTheme);
$("saveLayoutBtn").addEventListener("click", saveLayout);
$("resetLayoutBtn").addEventListener("click", resetLayout);
$("resetBtn").addEventListener("click", resetTheme);
window.addEventListener("resize", setPreviewScale);

function initApp() {
  buildPresetButtons();
  if (!loadSavedTheme()) applyTheme(presets.command);
  if (!loadSavedLayout()) applyLayout(DEFAULT_LAYOUT);
  updateNodeOptions();
  updatePreview();
}

initApp();
