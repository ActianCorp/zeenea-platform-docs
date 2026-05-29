# Authentication & User Provisioning — Architecture Diagrams

Data Catalog Platform // Auth0 + IdP + SCIM

<style>
:root {
  --bg: #f5f6fa;
  --surface: #ffffff;
  --surface2: #eef0f7;
  --border: #d0d5e8;
  --border2: #b8bfd8;
  --text: #1a1f36;
  --text-dim: #6b7594;
  --text-mid: #4a5278;
  --blue: #1a6fd4;
  --blue-dim: #dbeafe;
  --purple: #6d28d9;
  --green: #0a7c4e;
  --amber: #b45309;
  --red: #c7303f;
  --teal: #0369a1;
  --lime: #2d6a4f;
}

.scim-diagram-wrap * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.scim-diagram-wrap {
  background: var(--bg);
  color: var(--text);
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  min-height: 100vh;
  padding: 28px 32px;
  margin-top: 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
}

.scim-diagram-wrap .diagram-header {
  margin-bottom: 28px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 20px;
}

.scim-diagram-wrap .diagram-header h1 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
  margin-bottom: 4px;
}

.scim-diagram-wrap .diagram-header p {
  font-size: 12px;
  color: var(--text-dim);
  font-family: 'IBM Plex Mono', monospace;
}

.scim-diagram-wrap .panel {
  display: block;
}

.scim-diagram-wrap svg {
  width: 100%;
  height: auto;
  display: block;
}

.scim-diagram-wrap .note {
  margin-top: 16px;
  background: var(--surface2);
  border-left: 3px solid var(--blue);
  padding: 10px 14px;
  border-radius: 0 4px 4px 0;
  font-size: 12px;
  color: var(--text-mid);
  line-height: 1.65;
}

.scim-diagram-wrap .note strong {
  color: var(--text);
}
</style>

<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">

<div class="scim-diagram-wrap">
  <header class="diagram-header">
    <h1>Authentication &amp; User Provisioning — Architecture Diagrams</h1>
    <p>Data Catalog Platform // Auth0 + IdP + SCIM</p>
  </header>

  <div class="panel" id="overview">
    <svg viewBox="0 0 860 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="ov-gray" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3z" fill="#6b7594" />
        </marker>
        <marker id="ov-purple" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3z" fill="#6d28d9" />
        </marker>
        <marker id="ov-green" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L7,3z" fill="#0a7c4e" />
        </marker>
      </defs>

      <rect x="10" y="20" width="250" height="460" rx="8" fill="#f0f2fa" stroke="#c8cde6" stroke-width="1.5" />
      <text x="135" y="44" text-anchor="middle" font-size="9" font-weight="700" fill="#8896b8" letter-spacing="0.12em" font-family="IBM Plex Mono, monospace">CUSTOMER ZONE</text>

      <rect x="310" y="20" width="180" height="230" rx="8" fill="#f0f2fa" stroke="#c8cde6" stroke-width="1.5" />
      <text x="400" y="44" text-anchor="middle" font-size="9" font-weight="700" fill="#8896b8" letter-spacing="0.12em" font-family="IBM Plex Mono, monospace">AUTH LAYER</text>

      <rect x="550" y="20" width="300" height="460" rx="8" fill="#f0f2fa" stroke="#c8cde6" stroke-width="1.5" />
      <text x="700" y="44" text-anchor="middle" font-size="9" font-weight="700" fill="#8896b8" letter-spacing="0.12em" font-family="IBM Plex Mono, monospace">DATA CATALOG PLATFORM</text>

      <rect x="30" y="65" width="210" height="110" rx="6" fill="#eff6ff" stroke="#1a6fd4" stroke-width="2" />
      <text x="135" y="92" text-anchor="middle" font-size="12" font-weight="700" fill="#1a6fd4" font-family="IBM Plex Mono, monospace">Identity Provider</text>
      <text x="135" y="110" text-anchor="middle" font-size="10" fill="#4a5278">MS Entra / Okta / Google WS</text>
      <text x="135" y="127" text-anchor="middle" font-size="9" fill="#6b7594">Manages users &amp; groups</text>
      <text x="135" y="143" text-anchor="middle" font-size="9" fill="#6b7594">Issues SAML assertions / OIDC tokens</text>

      <rect x="30" y="230" width="210" height="70" rx="6" fill="#ffffff" stroke="#c8cde6" stroke-width="1.5" />
      <text x="135" y="260" text-anchor="middle" font-size="12" font-weight="600" fill="#1a1f36">End Users</text>
      <text x="135" y="278" text-anchor="middle" font-size="10" fill="#6b7594">Browser / App login</text>

      <rect x="30" y="340" width="210" height="120" rx="6" fill="#f0faf5" stroke="#0a7c4e" stroke-width="2" stroke-dasharray="6,3" />
      <text x="135" y="367" text-anchor="middle" font-size="11" font-weight="700" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">User Provisioning</text>
      <text x="135" y="386" text-anchor="middle" font-size="10" fill="#4a5278">SCIM (native, if supported)</text>
      <text x="135" y="403" text-anchor="middle" font-size="10" fill="#b45309">or Custom Sync Script</text>
      <text x="135" y="422" text-anchor="middle" font-size="9" fill="#6b7594">Users + group membership sync</text>
      <text x="135" y="439" text-anchor="middle" font-size="9" fill="#6b7594">with group mapping applied</text>

      <rect x="330" y="65" width="140" height="110" rx="6" fill="#f5f0ff" stroke="#6d28d9" stroke-width="2" />
      <text x="400" y="92" text-anchor="middle" font-size="12" font-weight="700" fill="#6d28d9" font-family="IBM Plex Mono, monospace">Auth0</text>
      <text x="400" y="112" text-anchor="middle" font-size="10" fill="#4a5278">Authentication</text>
      <text x="400" y="128" text-anchor="middle" font-size="10" fill="#4a5278">delegation layer</text>
      <text x="400" y="145" text-anchor="middle" font-size="9" fill="#6b7594">SAML v2 / OIDC</text>

      <rect x="570" y="65" width="260" height="110" rx="6" fill="#f0faf5" stroke="#0a7c4e" stroke-width="2" />
      <text x="700" y="92" text-anchor="middle" font-size="12" font-weight="700" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">Data Catalog</text>
      <text x="700" y="112" text-anchor="middle" font-size="10" fill="#4a5278">SaaS Platform</text>
      <text x="700" y="130" text-anchor="middle" font-size="10" fill="#4a5278">Permissions managed internally</text>
      <text x="700" y="148" text-anchor="middle" font-size="9" fill="#6b7594">via Groups (not Auth0)</text>

      <rect x="570" y="230" width="260" height="80" rx="6" fill="#f0faf5" stroke="#0a7c4e" stroke-width="1.5" stroke-dasharray="5,3" />
      <text x="700" y="260" text-anchor="middle" font-size="12" font-weight="700" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">SCIM API</text>
      <text x="700" y="280" text-anchor="middle" font-size="10" fill="#4a5278">Users - Group membership</text>

      <rect x="570" y="360" width="260" height="100" rx="6" fill="#fffbf0" stroke="#b45309" stroke-width="2" />
      <text x="700" y="388" text-anchor="middle" font-size="12" font-weight="700" fill="#b45309" font-family="IBM Plex Mono, monospace">Platform Groups</text>
      <text x="700" y="407" text-anchor="middle" font-size="10" fill="#4a5278">Defined inside the Catalog only</text>
      <text x="700" y="425" text-anchor="middle" font-size="10" fill="#4a5278">Not mirrored from IdP</text>
      <text x="700" y="443" text-anchor="middle" font-size="9" fill="#6b7594">Require explicit group mapping</text>

      <line x1="240" y1="118" x2="328" y2="118" stroke="#6d28d9" stroke-width="2" marker-end="url(#ov-purple)" />
      <line x1="470" y1="118" x2="568" y2="118" stroke="#6d28d9" stroke-width="2" marker-end="url(#ov-purple)" />
      <line x1="135" y1="301" x2="135" y2="338" stroke="#0a7c4e" stroke-width="2" marker-end="url(#ov-green)" />
      <line x1="240" y1="400" x2="568" y2="270" stroke="#0a7c4e" stroke-width="2" marker-end="url(#ov-green)" />
      <line x1="700" y1="311" x2="700" y2="358" stroke="#6b7594" stroke-width="2" marker-end="url(#ov-gray)" />

      <rect x="258" y="102" width="54" height="16" rx="2" fill="#f5f6fa" />
      <text x="285" y="113" text-anchor="middle" font-size="8.5" fill="#6d28d9" font-family="IBM Plex Mono, monospace">SAML/OIDC</text>

      <rect x="495" y="102" width="50" height="16" rx="2" fill="#f5f6fa" />
      <text x="520" y="113" text-anchor="middle" font-size="8.5" fill="#6d28d9" font-family="IBM Plex Mono, monospace">JWT</text>

      <rect x="340" y="250" width="180" height="20" rx="3" fill="#f5f6fa" stroke="#d0d5e8" stroke-width="1" />
      <text x="430" y="264" text-anchor="middle" font-size="8.5" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">Provisioning events (SCIM / Script)</text>
    </svg>

    <div class="note">
      <strong>Note:</strong> This page embeds the architecture diagram in HTML/SVG format for direct rendering in the documentation.
    </div>
  </div>
</div>