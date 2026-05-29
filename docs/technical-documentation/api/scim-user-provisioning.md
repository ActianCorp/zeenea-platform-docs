# Authentication & User Provisioning — Architecture Diagrams

Data Catalog Platform // Auth0 + IdP + SCIM

<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
.scim-diag {
  --bg:        #f5f6fa;
  --surface:   #ffffff;
  --surface2:  #eef0f7;
  --border:    #d0d5e8;
  --border2:   #b8bfd8;
  --text:      #1a1f36;
  --text-dim:  #6b7594;
  --text-mid:  #4a5278;
  --blue:      #1a6fd4;
  --blue-dim:  #dbeafe;
  --purple:    #6d28d9;
  --green:     #0a7c4e;
  --amber:     #b45309;
  --red:       #c7303f;
  --teal:      #0369a1;
  --lime:      #2d6a4f;
  background: var(--bg);
  color: var(--text);
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  padding: 28px 32px;
  border-radius: 8px;
  margin-top: 16px;
}
.scim-diag * { box-sizing: border-box; }
.scim-diag .tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.scim-diag .tab {
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 11.5px;
  font-weight: 600;
  font-family: 'IBM Plex Mono', monospace;
  cursor: pointer;
  border: 1px solid var(--border2);
  color: var(--text-dim);
  background: var(--surface);
  transition: all 0.15s;
  letter-spacing: 0.02em;
}
.scim-diag .tab:hover { color: var(--text-mid); border-color: #8896b8; }
.scim-diag .tab.active { background: var(--blue-dim); border-color: var(--blue); color: var(--blue); }
.scim-diag .panel { display: none; }
.scim-diag .panel.active { display: block; }
.scim-diag svg { width: 100%; height: auto; display: block; }
.scim-diag .note {
  margin-top: 16px;
  background: var(--surface2);
  border-left: 3px solid var(--blue);
  padding: 10px 14px;
  border-radius: 0 4px 4px 0;
  font-size: 12px;
  color: var(--text-mid);
  line-height: 1.65;
}
.scim-diag .note strong { color: var(--text); }
.scim-diag .note.amber { border-color: var(--amber); background: #fffbf0; }
.scim-diag .note.green  { border-color: var(--green);  background: #f0faf5; }
.scim-diag .legend {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 14px;
}
.scim-diag .leg { display: flex; align-items: center; gap: 7px; font-size: 11px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; }
.scim-diag .leg-dot { width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; }
</style>

<div class="scim-diag">

<div class="tabs">
  <div class="tab active" onclick="show('overview', this)">01 — Architecture Overview</div>
  <div class="tab" onclick="show('scim', this)">02 — SCIM Native Flow</div>
  <div class="tab" onclick="show('script', this)">03 — Script Sync Flow</div>
  <div class="tab" onclick="show('groups', this)">04 — Group Mapping</div>
</div>


<!-- ==================== PANEL 1: ARCHITECTURE OVERVIEW ==================== -->
<div class="panel active" id="overview">
<svg viewBox="0 0 860 500" xmlns="http://www.w3.org/2000/svg">
<defs>
  <marker id="ov-gray"   markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#6b7594"/></marker>
  <marker id="ov-purple" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#6d28d9"/></marker>
  <marker id="ov-green"  markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#0a7c4e"/></marker>
</defs>

<!-- Zone: Customer -->
<rect x="10" y="20" width="250" height="460" rx="8" fill="#f0f2fa" stroke="#c8cde6" stroke-width="1.5"/>
<text x="135" y="44" text-anchor="middle" font-size="9" font-weight="700" fill="#8896b8" letter-spacing="0.12em" font-family="IBM Plex Mono, monospace">CUSTOMER ZONE</text>

<!-- Zone: Auth Layer -->
<rect x="310" y="20" width="180" height="230" rx="8" fill="#f0f2fa" stroke="#c8cde6" stroke-width="1.5"/>
<text x="400" y="44" text-anchor="middle" font-size="9" font-weight="700" fill="#8896b8" letter-spacing="0.12em" font-family="IBM Plex Mono, monospace">AUTH LAYER</text>

<!-- Zone: Catalog Platform -->
<rect x="550" y="20" width="300" height="460" rx="8" fill="#f0f2fa" stroke="#c8cde6" stroke-width="1.5"/>
<text x="700" y="44" text-anchor="middle" font-size="9" font-weight="700" fill="#8896b8" letter-spacing="0.12em" font-family="IBM Plex Mono, monospace">DATA CATALOG PLATFORM</text>

<!-- IdP -->
<rect x="30" y="65" width="210" height="110" rx="6" fill="#eff6ff" stroke="#1a6fd4" stroke-width="2"/>
<text x="135" y="92"  text-anchor="middle" font-size="12" font-weight="700" fill="#1a6fd4" font-family="IBM Plex Mono, monospace">Identity Provider</text>
<text x="135" y="110" text-anchor="middle" font-size="10" fill="#4a5278">MS Entra / Okta / Google WS</text>
<text x="135" y="127" text-anchor="middle" font-size="9"  fill="#6b7594">Manages users &amp; groups</text>
<text x="135" y="143" text-anchor="middle" font-size="9"  fill="#6b7594">Issues SAML assertions / OIDC tokens</text>

<!-- End Users -->
<rect x="30" y="230" width="210" height="70" rx="6" fill="#ffffff" stroke="#c8cde6" stroke-width="1.5"/>
<text x="135" y="260" text-anchor="middle" font-size="12" font-weight="600" fill="#1a1f36">End Users</text>
<text x="135" y="278" text-anchor="middle" font-size="10" fill="#6b7594">Browser / App login</text>

<!-- Provisioning -->
<rect x="30" y="340" width="210" height="120" rx="6" fill="#f0faf5" stroke="#0a7c4e" stroke-width="2" stroke-dasharray="6,3"/>
<text x="135" y="367" text-anchor="middle" font-size="11" font-weight="700" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">User Provisioning</text>
<text x="135" y="386" text-anchor="middle" font-size="10" fill="#4a5278">SCIM (native, if supported)</text>
<text x="135" y="403" text-anchor="middle" font-size="10" fill="#b45309">or Custom Sync Script</text>
<text x="135" y="422" text-anchor="middle" font-size="9"  fill="#6b7594">Users + group membership sync</text>
<text x="135" y="439" text-anchor="middle" font-size="9"  fill="#6b7594">with group mapping applied</text>

<!-- Auth0 -->
<rect x="330" y="65" width="140" height="110" rx="6" fill="#f5f0ff" stroke="#6d28d9" stroke-width="2"/>
<text x="400" y="92"  text-anchor="middle" font-size="12" font-weight="700" fill="#6d28d9" font-family="IBM Plex Mono, monospace">Auth0</text>
<text x="400" y="112" text-anchor="middle" font-size="10" fill="#4a5278">Authentication</text>
<text x="400" y="128" text-anchor="middle" font-size="10" fill="#4a5278">delegation layer</text>
<text x="400" y="145" text-anchor="middle" font-size="9"  fill="#6b7594">SAML v2 / OIDC</text>

<!-- Data Catalog -->
<rect x="570" y="65" width="260" height="110" rx="6" fill="#f0faf5" stroke="#0a7c4e" stroke-width="2"/>
<text x="700" y="92"  text-anchor="middle" font-size="12" font-weight="700" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">Data Catalog</text>
<text x="700" y="112" text-anchor="middle" font-size="10" fill="#4a5278">SaaS Platform</text>
<text x="700" y="130" text-anchor="middle" font-size="10" fill="#4a5278">Permissions managed internally</text>
<text x="700" y="148" text-anchor="middle" font-size="9"  fill="#6b7594">via Groups (not Auth0)</text>

<!-- SCIM API -->
<rect x="570" y="230" width="260" height="80" rx="6" fill="#f0faf5" stroke="#0a7c4e" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="700" y="260" text-anchor="middle" font-size="12" font-weight="700" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">SCIM API</text>
<text x="700" y="280" text-anchor="middle" font-size="10" fill="#4a5278">Users — Group membership</text>

<!-- Platform Groups -->
<rect x="570" y="360" width="260" height="100" rx="6" fill="#fffbf0" stroke="#b45309" stroke-width="2"/>
<text x="700" y="388" text-anchor="middle" font-size="12" font-weight="700" fill="#b45309" font-family="IBM Plex Mono, monospace">Platform Groups</text>
<text x="700" y="407" text-anchor="middle" font-size="10" fill="#4a5278">Defined inside the Catalog only</text>
<text x="700" y="425" text-anchor="middle" font-size="10" fill="#4a5278">Not mirrored from IdP</text>
<text x="700" y="443" text-anchor="middle" font-size="9"  fill="#6b7594">Require explicit group mapping</text>

<!-- Arrow: IdP -> Auth0 -->
<line x1="240" y1="118" x2="328" y2="118" stroke="#6d28d9" stroke-width="2" marker-end="url(#ov-purple)"/>
<rect x="240" y="104" width="80" height="15" rx="2" fill="#f5f6fa"/>
<text x="280" y="115" text-anchor="middle" font-size="8.5" fill="#6d28d9" font-family="IBM Plex Mono, monospace">SAML / OIDC</text>

<!-- Arrow: Auth0 -> Data Catalog -->
<line x1="470" y1="118" x2="568" y2="118" stroke="#6d28d9" stroke-width="2" marker-end="url(#ov-purple)"/>
<rect x="470" y="104" width="70" height="15" rx="2" fill="#f5f6fa"/>
<text x="505" y="115" text-anchor="middle" font-size="8.5" fill="#6d28d9" font-family="IBM Plex Mono, monospace">JWT token</text>

<!-- Arrow: Users -> Auth0 (dashed) -->
<path d="M 135 300 C 135 330 400 260 400 177" stroke="#8896b8" stroke-width="1.5" fill="none" stroke-dasharray="4,3" marker-end="url(#ov-gray)"/>
<text x="220" y="330" text-anchor="middle" font-size="8.5" fill="#6b7594">login request</text>

<!-- Arrow: Provisioning -> SCIM API -->
<line x1="240" y1="390" x2="568" y2="290" stroke="#0a7c4e" stroke-width="2" marker-end="url(#ov-green)"/>
<rect x="310" y="315" width="100" height="15" rx="2" fill="#f5f6fa"/>
<text x="360" y="326" text-anchor="middle" font-size="8.5" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">SCIM API calls</text>

<!-- Arrow: SCIM API -> Catalog -->
<line x1="700" y1="230" x2="700" y2="177" stroke="#0a7c4e" stroke-width="1.5" marker-end="url(#ov-green)"/>
<text x="722" y="210" font-size="8.5" fill="#0a7c4e">creates</text>

<!-- Arrow: SCIM API -> Groups -->
<line x1="700" y1="312" x2="700" y2="358" stroke="#0a7c4e" stroke-width="1.5" marker-end="url(#ov-green)"/>
<text x="722" y="340" font-size="8.5" fill="#0a7c4e">assigns</text>

<text x="400" y="290" text-anchor="middle" font-size="9" fill="#6b7594" font-style="italic">Auth0 handles only authentication.</text>
<text x="400" y="305" text-anchor="middle" font-size="9" fill="#6b7594" font-style="italic">Permissions live in the Catalog.</text>
</svg>

<div class="legend">
  <div class="leg"><div class="leg-dot" style="background:#6d28d9"></div>Authentication path (Auth0)</div>
  <div class="leg"><div class="leg-dot" style="background:#0a7c4e"></div>Provisioning path (SCIM)</div>
  <div class="leg"><div class="leg-dot" style="background:#b45309"></div>Permissions / Groups (Catalog only)</div>
  <div class="leg"><div class="leg-dot" style="background:#1a6fd4"></div>Identity Provider</div>
</div>
<div class="note">
  <strong>Two independent concerns:</strong> Authentication (who you are) is delegated to Auth0 and the IdP via SAML or OIDC.
  Authorization (what you can access) is managed exclusively inside the Data Catalog through Groups.
  SCIM provisioning keeps users and group memberships in sync — it is not involved in authentication.
</div>
</div>


<!-- ==================== PANEL 2: SCIM NATIVE FLOW ==================== -->
<div class="panel" id="scim">
<svg viewBox="0 0 860 570" xmlns="http://www.w3.org/2000/svg">
<defs>
  <marker id="sc-green" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#0a7c4e"/></marker>
  <marker id="sc-red"   markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#c7303f"/></marker>
</defs>

<!-- Swimlane headers -->
<rect x="10" y="10" width="190" height="550" rx="6" fill="#fafbff" stroke="#d0d5e8" stroke-width="1"/>
<rect x="10" y="10" width="190" height="38"  rx="6" fill="#dbeafe" stroke="#1a6fd4" stroke-width="1.5"/>
<text x="105" y="34" text-anchor="middle" font-size="10" font-weight="700" fill="#1a6fd4" font-family="IBM Plex Mono, monospace">Identity Provider</text>

<rect x="210" y="10" width="190" height="550" rx="6" fill="#fafbff" stroke="#d0d5e8" stroke-width="1"/>
<rect x="210" y="10" width="190" height="38"  rx="6" fill="#ede9fe" stroke="#6d28d9" stroke-width="1.5"/>
<text x="305" y="34" text-anchor="middle" font-size="10" font-weight="700" fill="#6d28d9" font-family="IBM Plex Mono, monospace">SCIM Client (IdP-side)</text>

<rect x="410" y="10" width="190" height="550" rx="6" fill="#fafbff" stroke="#d0d5e8" stroke-width="1"/>
<rect x="410" y="10" width="190" height="38"  rx="6" fill="#dcfce7" stroke="#0a7c4e" stroke-width="1.5"/>
<text x="505" y="34" text-anchor="middle" font-size="10" font-weight="700" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">Catalog SCIM API</text>

<rect x="610" y="10" width="240" height="550" rx="6" fill="#fafbff" stroke="#d0d5e8" stroke-width="1"/>
<rect x="610" y="10" width="240" height="38"  rx="6" fill="#fffbeb" stroke="#b45309" stroke-width="1.5"/>
<text x="730" y="34" text-anchor="middle" font-size="10" font-weight="700" fill="#b45309" font-family="IBM Plex Mono, monospace">Catalog (Users + Groups)</text>

<!-- === USER CREATION === -->
<text x="435" y="72" text-anchor="middle" font-size="8.5" fill="#8896b8" letter-spacing="0.1em" font-family="IBM Plex Mono, monospace">USER CREATION</text>
<line x1="10" y1="76" x2="850" y2="76" stroke="#d0d5e8" stroke-width="0.5"/>

<rect x="22"  y="85" width="166" height="48" rx="5" fill="#dbeafe" stroke="#1a6fd4" stroke-width="1.5"/>
<text x="105" y="107" text-anchor="middle" font-size="9.5" font-weight="600" fill="#1a6fd4">User created / updated</text>
<text x="105" y="122" text-anchor="middle" font-size="8.5" fill="#4a5278">in IdP directory</text>
<line x1="188" y1="109" x2="208" y2="109" stroke="#0a7c4e" stroke-width="1.5" marker-end="url(#sc-green)"/>

<rect x="222" y="85" width="166" height="48" rx="5" fill="#ede9fe" stroke="#6d28d9" stroke-width="1.5"/>
<text x="305" y="107" text-anchor="middle" font-size="9.5" font-weight="600" fill="#6d28d9">SCIM event triggered</text>
<text x="305" y="122" text-anchor="middle" font-size="8.5" fill="#4a5278">by IdP automation</text>
<line x1="388" y1="109" x2="408" y2="109" stroke="#0a7c4e" stroke-width="1.5" marker-end="url(#sc-green)"/>

<rect x="422" y="85" width="166" height="48" rx="5" fill="#dcfce7" stroke="#0a7c4e" stroke-width="1.5"/>
<text x="505" y="107" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">POST /Users</text>
<text x="505" y="122" text-anchor="middle" font-size="8.5" fill="#4a5278">Create or update user</text>
<line x1="588" y1="109" x2="608" y2="109" stroke="#0a7c4e" stroke-width="1.5" marker-end="url(#sc-green)"/>

<rect x="622" y="85" width="216" height="48" rx="5" fill="#fffbeb" stroke="#b45309" stroke-width="1.5"/>
<text x="730" y="107" text-anchor="middle" font-size="9.5" font-weight="600" fill="#b45309">User record created</text>
<text x="730" y="122" text-anchor="middle" font-size="8.5" fill="#4a5278">in Catalog</text>

<!-- === GROUP ASSIGNMENT === -->
<text x="435" y="160" text-anchor="middle" font-size="8.5" fill="#8896b8" letter-spacing="0.1em" font-family="IBM Plex Mono, monospace">GROUP ASSIGNMENT</text>
<line x1="10" y1="164" x2="850" y2="164" stroke="#d0d5e8" stroke-width="0.5"/>

<rect x="22"  y="174" width="166" height="60" rx="5" fill="#dbeafe" stroke="#1a6fd4" stroke-width="1.5"/>
<text x="105" y="196" text-anchor="middle" font-size="9.5" font-weight="600" fill="#1a6fd4">Group assigned</text>
<text x="105" y="211" text-anchor="middle" font-size="8.5" fill="#4a5278">to user in IdP</text>
<text x="105" y="226" text-anchor="middle" font-size="8"   fill="#6b7594">(IdP group notation)</text>
<line x1="188" y1="204" x2="208" y2="204" stroke="#0a7c4e" stroke-width="1.5" marker-end="url(#sc-green)"/>

<rect x="222" y="174" width="166" height="60" rx="5" fill="#ede9fe" stroke="#6d28d9" stroke-width="1.5"/>
<text x="305" y="196" text-anchor="middle" font-size="9.5" font-weight="600" fill="#6d28d9">Apply group mapping</text>
<text x="305" y="211" text-anchor="middle" font-size="8.5" fill="#4a5278">IdP group name</text>
<text x="305" y="226" text-anchor="middle" font-size="8.5" fill="#b45309">-&gt; Catalog group name</text>
<line x1="388" y1="204" x2="408" y2="204" stroke="#0a7c4e" stroke-width="1.5" marker-end="url(#sc-green)"/>

<rect x="422" y="174" width="166" height="60" rx="5" fill="#dcfce7" stroke="#0a7c4e" stroke-width="1.5"/>
<text x="505" y="196" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">PATCH /Groups/{id}</text>
<text x="505" y="211" text-anchor="middle" font-size="8.5" fill="#4a5278">Add member</text>
<text x="505" y="226" text-anchor="middle" font-size="8.5" fill="#4a5278">to Catalog group</text>
<line x1="588" y1="204" x2="608" y2="204" stroke="#0a7c4e" stroke-width="1.5" marker-end="url(#sc-green)"/>

<rect x="622" y="174" width="216" height="60" rx="5" fill="#fffbeb" stroke="#b45309" stroke-width="1.5"/>
<text x="730" y="196" text-anchor="middle" font-size="9.5" font-weight="600" fill="#b45309">User added to group</text>
<text x="730" y="211" text-anchor="middle" font-size="8.5" fill="#4a5278">Permissions apply</text>
<text x="730" y="226" text-anchor="middle" font-size="8"   fill="#0a7c4e">access granted in Catalog</text>

<!-- === DEPROVISIONING === -->
<text x="435" y="262" text-anchor="middle" font-size="8.5" fill="#8896b8" letter-spacing="0.1em" font-family="IBM Plex Mono, monospace">DEPROVISIONING</text>
<line x1="10" y1="266" x2="850" y2="266" stroke="#d0d5e8" stroke-width="0.5"/>

<rect x="22"  y="276" width="166" height="60" rx="5" fill="#fee2e2" stroke="#c7303f" stroke-width="1.5"/>
<text x="105" y="298" text-anchor="middle" font-size="9.5" font-weight="600" fill="#c7303f">User removed</text>
<text x="105" y="313" text-anchor="middle" font-size="8.5" fill="#4a5278">from IdP</text>
<text x="105" y="328" text-anchor="middle" font-size="8"   fill="#6b7594">or account disabled</text>
<line x1="188" y1="306" x2="208" y2="306" stroke="#c7303f" stroke-width="1.5" marker-end="url(#sc-red)"/>

<rect x="222" y="276" width="166" height="60" rx="5" fill="#ede9fe" stroke="#6d28d9" stroke-width="1.5"/>
<text x="305" y="298" text-anchor="middle" font-size="9.5" font-weight="600" fill="#6d28d9">SCIM deprovision</text>
<text x="305" y="313" text-anchor="middle" font-size="8.5" fill="#4a5278">event triggered</text>
<text x="305" y="328" text-anchor="middle" font-size="8"   fill="#6b7594">automatically</text>
<line x1="388" y1="306" x2="408" y2="306" stroke="#c7303f" stroke-width="1.5" marker-end="url(#sc-red)"/>

<rect x="422" y="276" width="166" height="60" rx="5" fill="#dcfce7" stroke="#0a7c4e" stroke-width="1.5"/>
<text x="505" y="298" text-anchor="middle" font-size="9.5" font-weight="600" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">DELETE /Users/{id}</text>
<text x="505" y="313" text-anchor="middle" font-size="8.5" fill="#4a5278">Delete user</text>
<line x1="588" y1="306" x2="608" y2="306" stroke="#c7303f" stroke-width="1.5" marker-end="url(#sc-red)"/>

<rect x="622" y="276" width="216" height="60" rx="5" fill="#fee2e2" stroke="#c7303f" stroke-width="1.5"/>
<text x="730" y="298" text-anchor="middle" font-size="9.5" font-weight="600" fill="#c7303f">User deactivated</text>
<text x="730" y="313" text-anchor="middle" font-size="8.5" fill="#4a5278">All access removed</text>
<text x="730" y="328" text-anchor="middle" font-size="8"   fill="#c7303f">immediately</text>

<!-- === REQUIRED CONFIG === -->
<text x="435" y="367" text-anchor="middle" font-size="8.5" fill="#8896b8" letter-spacing="0.1em" font-family="IBM Plex Mono, monospace">REQUIRED CONFIGURATION</text>
<line x1="10" y1="371" x2="850" y2="371" stroke="#d0d5e8" stroke-width="0.5"/>

<rect x="22"  y="381" width="370" height="130" rx="5" fill="#fffbeb" stroke="#b45309" stroke-width="1.5" stroke-dasharray="6,3"/>
<text x="207" y="402" text-anchor="middle" font-size="9"   font-weight="700" fill="#b45309">Configure in IdP SCIM settings</text>
<text x="207" y="422" text-anchor="middle" font-size="8.5" fill="#4a5278" font-family="IBM Plex Mono, monospace">SCIM endpoint URL    -&gt;  provided by Catalog Admin</text>
<text x="207" y="442" text-anchor="middle" font-size="8.5" fill="#4a5278" font-family="IBM Plex Mono, monospace">Catalog API Key      -&gt;  generated in Catalog</text>
<text x="207" y="462" text-anchor="middle" font-size="8.5" fill="#4a5278" font-family="IBM Plex Mono, monospace">Group mapping rules  -&gt;  co-defined by both teams</text>
<text x="207" y="482" text-anchor="middle" font-size="8.5" fill="#4a5278" font-family="IBM Plex Mono, monospace">Attribute mapping    -&gt;  email, name, display_name</text>
<text x="207" y="502" text-anchor="middle" font-size="8"   fill="#6b7594">API Key is used as the Bearer Token value in HTTP calls</text>

<rect x="422" y="381" width="416" height="130" rx="5" fill="#dcfce7" stroke="#0a7c4e" stroke-width="1.5" stroke-dasharray="6,3"/>
<text x="630" y="402" text-anchor="middle" font-size="9"   font-weight="700" fill="#0a7c4e">Catalog Admin responsibilities</text>
<text x="630" y="422" text-anchor="middle" font-size="8.5" fill="#4a5278">Generate Catalog API Key for SCIM</text>
<text x="630" y="442" text-anchor="middle" font-size="8.5" fill="#4a5278">Create target groups in Catalog</text>
<text x="630" y="462" text-anchor="middle" font-size="8.5" fill="#4a5278">Validate provisioning in audit logs</text>
<text x="630" y="482" text-anchor="middle" font-size="8.5" fill="#4a5278">No custom code required</text>
<text x="630" y="502" text-anchor="middle" font-size="8"   fill="#0a7c4e">Rotate API Key on schedule</text>
</svg>

<div class="note green">
  <strong>When to use this flow:</strong> The IdP natively supports SCIM provisioning (MS Entra, Okta, OneLogin, Ping Identity...).
  Configuration is done entirely on the IdP side. No custom development is needed.
  This is the preferred approach when available.
</div>
</div>


<!-- ==================== PANEL 3: SCRIPT SYNC FLOW ==================== -->
<div class="panel" id="script">
<svg viewBox="0 0 860 660" xmlns="http://www.w3.org/2000/svg">
<defs>
  <marker id="sp-amber"  markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#b45309"/></marker>
  <marker id="sp-green"  markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#0a7c4e"/></marker>
  <marker id="sp-gray"   markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#6b7594"/></marker>
  <marker id="sp-red"    markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#c7303f"/></marker>
  <marker id="sp-teal"   markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#0369a1"/></marker>
  <marker id="sp-lime"   markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3z" fill="#2d6a4f"/></marker>
</defs>

<text x="430" y="26" text-anchor="middle" font-size="13" font-weight="700" fill="#b45309" font-family="IBM Plex Mono, monospace">Non-SCIM IdP — Custom Synchronization Script</text>

<!-- Scheduler -->
<rect x="10" y="50" width="130" height="60" rx="6" fill="#ffffff" stroke="#b8bfd8" stroke-width="1.5"/>
<text x="75" y="76" text-anchor="middle" font-size="10" font-weight="600" fill="#4a5278">Scheduler</text>
<text x="75" y="93" text-anchor="middle" font-size="8.5" fill="#6b7594">cron / CI / Azure Fn</text>
<line x1="140" y1="80" x2="165" y2="80" stroke="#8896b8" stroke-width="1.5" marker-end="url(#sp-gray)"/>

<!-- Sync Script outer box -->
<rect x="165" y="40" width="210" height="505" rx="6" fill="#fffbeb" stroke="#b45309" stroke-width="2"/>
<text x="270" y="64"  text-anchor="middle" font-size="11" font-weight="700" fill="#b45309" font-family="IBM Plex Mono, monospace">Sync Script</text>
<text x="270" y="80"  text-anchor="middle" font-size="8.5" fill="#6b7594">Python / Node.js / PowerShell</text>

<!-- Step 1 -->
<rect x="180" y="93"  width="180" height="52" rx="4" fill="#ffffff" stroke="#b45309" stroke-width="1"/>
<text x="270" y="114" text-anchor="middle" font-size="9" font-weight="600" fill="#b45309">1. Fetch users from IdP</text>
<text x="270" y="129" text-anchor="middle" font-size="8.5" fill="#4a5278">via IdP REST API or LDAP</text>
<text x="270" y="141" text-anchor="middle" font-size="8"   fill="#1a6fd4">-&gt; email, name, status</text>
<line x1="270" y1="145" x2="270" y2="158" stroke="#b45309" stroke-width="1.2" marker-end="url(#sp-amber)"/>

<!-- Step 2 -->
<rect x="180" y="160" width="180" height="52" rx="4" fill="#ffffff" stroke="#b45309" stroke-width="1"/>
<text x="270" y="181" text-anchor="middle" font-size="9" font-weight="600" fill="#b45309">2. Fetch groups from IdP</text>
<text x="270" y="196" text-anchor="middle" font-size="8.5" fill="#4a5278">with user memberships</text>
<text x="270" y="208" text-anchor="middle" font-size="8"   fill="#1a6fd4">-&gt; groupId, members[]</text>
<line x1="270" y1="212" x2="270" y2="225" stroke="#b45309" stroke-width="1.2" marker-end="url(#sp-amber)"/>

<!-- Step 3 -->
<rect x="180" y="227" width="180" height="58" rx="4" fill="#ffffff" stroke="#b45309" stroke-width="1"/>
<text x="270" y="248" text-anchor="middle" font-size="9" font-weight="600" fill="#b45309">3. Apply group mapping</text>
<text x="270" y="263" text-anchor="middle" font-size="8.5" fill="#4a5278">IdP group A -&gt; Catalog group X</text>
<text x="270" y="278" text-anchor="middle" font-size="8.5" fill="#b45309">from mapping config file</text>
<line x1="270" y1="285" x2="270" y2="298" stroke="#b45309" stroke-width="1.2" marker-end="url(#sp-amber)"/>

<!-- Step 4: DIFF — two sub-options -->
<rect x="180" y="300" width="180" height="160" rx="4" fill="#ffffff" stroke="#b45309" stroke-width="1"/>
<text x="270" y="320" text-anchor="middle" font-size="9" font-weight="600" fill="#b45309">4. Diff with previous state</text>
<text x="270" y="334" text-anchor="middle" font-size="8" fill="#6b7594">Determine what changed since last run</text>

<!-- Option A -->
<rect x="187" y="340" width="166" height="52" rx="3" fill="#e0f2fe" stroke="#0369a1" stroke-width="1.2"/>
<text x="270" y="357" text-anchor="middle" font-size="8.5" font-weight="700" fill="#0369a1">Option A — Live query</text>
<text x="270" y="371" text-anchor="middle" font-size="8"   fill="#4a5278">GET /Users + GET /Groups</text>
<text x="270" y="384" text-anchor="middle" font-size="8"   fill="#6b7594">from Catalog SCIM API</text>

<!-- Option B -->
<rect x="187" y="398" width="166" height="52" rx="3" fill="#dcfce7" stroke="#2d6a4f" stroke-width="1.2"/>
<text x="270" y="415" text-anchor="middle" font-size="8.5" font-weight="700" fill="#2d6a4f">Option B — Local snapshot</text>
<text x="270" y="429" text-anchor="middle" font-size="8"   fill="#4a5278">Read last saved state file</text>
<text x="270" y="442" text-anchor="middle" font-size="8"   fill="#6b7594">JSON / DB on script host</text>

<line x1="270" y1="460" x2="270" y2="473" stroke="#b45309" stroke-width="1.2" marker-end="url(#sp-amber)"/>

<!-- Step 5 -->
<rect x="180" y="475" width="180" height="58" rx="4" fill="#dcfce7" stroke="#0a7c4e" stroke-width="1.5"/>
<text x="270" y="496" text-anchor="middle" font-size="9" font-weight="600" fill="#0a7c4e">5. Push delta to Catalog</text>
<text x="270" y="511" text-anchor="middle" font-size="8.5" fill="#4a5278">POST / PATCH / DELETE</text>
<text x="270" y="523" text-anchor="middle" font-size="8.5" fill="#4a5278">via Catalog SCIM API</text>

<!-- Arrow steps 1+2 -> IdP API -->
<line x1="165" y1="147" x2="140" y2="147" stroke="#1a6fd4" stroke-width="1.5" marker-end="url(#sp-gray)"/>

<!-- IdP API box -->
<rect x="10" y="120" width="130" height="80" rx="6" fill="#eff6ff" stroke="#1a6fd4" stroke-width="1.5"/>
<text x="75" y="152" text-anchor="middle" font-size="10" font-weight="700" fill="#1a6fd4">IdP API</text>
<text x="75" y="168" text-anchor="middle" font-size="8.5" fill="#4a5278">or LDAP</text>
<text x="75" y="183" text-anchor="middle" font-size="8"   fill="#6b7594">read-only access</text>

<!-- Local State box (Option B) -->
<rect x="10" y="380" width="130" height="75" rx="6" fill="#dcfce7" stroke="#2d6a4f" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="75" y="405" text-anchor="middle" font-size="9"   font-weight="600" fill="#2d6a4f">Local State</text>
<text x="75" y="420" text-anchor="middle" font-size="8"   fill="#4a5278">JSON / SQLite</text>
<text x="75" y="434" text-anchor="middle" font-size="8"   fill="#4a5278">on script host</text>
<text x="75" y="448" text-anchor="middle" font-size="7.5" fill="#2d6a4f">updated each run</text>

<!-- Arrow Option B <-> local state -->
<line x1="165" y1="424" x2="140" y2="424" stroke="#2d6a4f" stroke-width="1.2" stroke-dasharray="4,3" marker-end="url(#sp-lime)"/>

<!-- Catalog SCIM API column -->
<rect x="430" y="40" width="200" height="505" rx="6" fill="#f0faf5" stroke="#0a7c4e" stroke-width="2"/>
<text x="530" y="64" text-anchor="middle" font-size="11" font-weight="700" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">Catalog SCIM API</text>

<!-- GET /Users — Option A -->
<rect x="445" y="82"  width="170" height="50" rx="4" fill="#e0f2fe" stroke="#0369a1" stroke-width="1.2"/>
<text x="530" y="103" text-anchor="middle" font-size="9"   font-weight="600" fill="#0369a1" font-family="IBM Plex Mono, monospace">GET /Users</text>
<text x="530" y="118" text-anchor="middle" font-size="8"   fill="#0369a1">Option A: diff source</text>
<text x="530" y="129" text-anchor="middle" font-size="7.5" fill="#6b7594">not used in Option B</text>

<!-- GET /Groups — Option A -->
<rect x="445" y="142" width="170" height="50" rx="4" fill="#e0f2fe" stroke="#0369a1" stroke-width="1.2"/>
<text x="530" y="163" text-anchor="middle" font-size="9"   font-weight="600" fill="#0369a1" font-family="IBM Plex Mono, monospace">GET /Groups</text>
<text x="530" y="178" text-anchor="middle" font-size="8"   fill="#0369a1">Option A: diff source</text>
<text x="530" y="189" text-anchor="middle" font-size="7.5" fill="#6b7594">not used in Option B</text>

<!-- POST /Users -->
<rect x="445" y="202" width="170" height="44" rx="4" fill="#dcfce7" stroke="#0a7c4e" stroke-width="1"/>
<text x="530" y="222" text-anchor="middle" font-size="9"   font-weight="600" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">POST /Users</text>
<text x="530" y="238" text-anchor="middle" font-size="8.5" fill="#4a5278">create new user</text>

<!-- PATCH /Users -->
<rect x="445" y="256" width="170" height="44" rx="4" fill="#dcfce7" stroke="#0a7c4e" stroke-width="1"/>
<text x="530" y="276" text-anchor="middle" font-size="9"   font-weight="600" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">PATCH /Users/{id}</text>
<text x="530" y="292" text-anchor="middle" font-size="8.5" fill="#4a5278">update user attributes</text>

<!-- PATCH /Groups -->
<rect x="445" y="310" width="170" height="44" rx="4" fill="#dcfce7" stroke="#0a7c4e" stroke-width="1"/>
<text x="530" y="330" text-anchor="middle" font-size="9"   font-weight="600" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">PATCH /Groups/{id}</text>
<text x="530" y="346" text-anchor="middle" font-size="8.5" fill="#4a5278">add / remove members</text>

<!-- DELETE /Users -->
<rect x="445" y="364" width="170" height="44" rx="4" fill="#fee2e2" stroke="#c7303f" stroke-width="1"/>
<text x="530" y="384" text-anchor="middle" font-size="9"   font-weight="600" fill="#c7303f" font-family="IBM Plex Mono, monospace">DELETE /Users/{id}</text>
<text x="530" y="400" text-anchor="middle" font-size="8.5" fill="#4a5278">deprovision user</text>

<!-- Arrow: Option A diff read (dashed) -->
<path d="M 430 107 C 408 107 395 330 375 330" stroke="#0369a1" stroke-width="1" fill="none" stroke-dasharray="3,3" marker-end="url(#sp-teal)"/>

<!-- Arrow: step 5 -> write ops -->
<line x1="375" y1="500" x2="428" y2="380" stroke="#0a7c4e" stroke-width="2" marker-end="url(#sp-green)"/>

<!-- Catalog data column -->
<rect x="650" y="40" width="200" height="505" rx="6" fill="#ffffff" stroke="#d0d5e8" stroke-width="1.5"/>
<text x="750" y="64" text-anchor="middle" font-size="11" font-weight="700" fill="#1a1f36">Catalog</text>
<text x="750" y="80" text-anchor="middle" font-size="9"  fill="#6b7594">Data store</text>

<line x1="615" y1="107" x2="648" y2="107" stroke="#0369a1" stroke-width="1.5" marker-end="url(#sp-green)"/>
<line x1="615" y1="167" x2="648" y2="167" stroke="#0369a1" stroke-width="1.5" marker-end="url(#sp-green)"/>
<line x1="615" y1="224" x2="648" y2="224" stroke="#0a7c4e" stroke-width="1.5" marker-end="url(#sp-green)"/>
<line x1="615" y1="278" x2="648" y2="278" stroke="#0a7c4e" stroke-width="1.5" marker-end="url(#sp-green)"/>
<line x1="615" y1="332" x2="648" y2="332" stroke="#0a7c4e" stroke-width="1.5" marker-end="url(#sp-green)"/>
<line x1="615" y1="386" x2="648" y2="386" stroke="#c7303f" stroke-width="1.5" marker-end="url(#sp-red)"/>

<text x="750" y="132" text-anchor="middle" font-size="8.5" fill="#0369a1">Users list (opt. A)</text>
<text x="750" y="192" text-anchor="middle" font-size="8.5" fill="#0369a1">Groups list (opt. A)</text>
<text x="750" y="250" text-anchor="middle" font-size="8.5" fill="#0a7c4e">Created</text>
<text x="750" y="304" text-anchor="middle" font-size="8.5" fill="#0a7c4e">Updated</text>
<text x="750" y="358" text-anchor="middle" font-size="8.5" fill="#0a7c4e">Members updated</text>
<text x="750" y="410" text-anchor="middle" font-size="8.5" fill="#c7303f">Deprovisioned</text>

<!-- Option B: save state after run -->
<path d="M 375 520 C 290 560 140 530 140 457" stroke="#2d6a4f" stroke-width="1" fill="none" stroke-dasharray="3,3" marker-end="url(#sp-lime)"/>
<text x="240" y="572" text-anchor="middle" font-size="8" fill="#2d6a4f">opt. B: save state after successful run</text>

<!-- Credentials note -->
<rect x="10" y="565" width="630" height="88" rx="5" fill="#fffbeb" stroke="#b45309" stroke-width="1.5" stroke-dasharray="5,3"/>
<text x="325" y="585" text-anchor="middle" font-size="9"   font-weight="700" fill="#b45309">Script requires two sets of credentials</text>
<text x="325" y="604" text-anchor="middle" font-size="8.5" fill="#4a5278" font-family="IBM Plex Mono, monospace">IdP API key / service account  (read-only, from IT team)</text>
<text x="325" y="622" text-anchor="middle" font-size="8.5" fill="#4a5278" font-family="IBM Plex Mono, monospace">Catalog API Key (SCIM)         (from Catalog Admin) -- used as Bearer Token value</text>
<text x="325" y="640" text-anchor="middle" font-size="8.5" fill="#4a5278" font-family="IBM Plex Mono, monospace">Group mapping config file      (co-designed by both teams)</text>
<text x="325" y="648" text-anchor="middle" font-size="7.5" fill="#2d6a4f">Option B also requires: write access to local state storage on script host</text>
</svg>

<div class="note amber">
  <strong>When to use this flow:</strong> The IdP does not natively support SCIM provisioning.
  A sync script acts as the glue layer, scheduled regularly (e.g. every 15-30 minutes).
  <br><br>
  <strong>Diff — Option A (Live query):</strong> Each run fetches the current state from the Catalog SCIM API (GET /Users, GET /Groups) and computes the delta against the data just retrieved from the IdP. Simple to implement, always up to date, but adds extra read calls to the Catalog on every execution.
  <br><br>
  <strong>Diff — Option B (Local snapshot):</strong> The script saves the last successfully synced state to a local file (JSON or SQLite) on the script host. The next run computes the delta against that snapshot instead of querying the Catalog. Faster and resilient to Catalog API unavailability during the diff phase, but requires managing the lifecycle of the state file (storage, corruption handling, recovery after failed runs).
</div>
</div>


<!-- ==================== PANEL 4: GROUP MAPPING ==================== -->
<div class="panel" id="groups">
<svg viewBox="0 0 860 510" xmlns="http://www.w3.org/2000/svg">

<text x="430" y="26" text-anchor="middle" font-size="13" font-weight="700" fill="#1a1f36">Group Mapping — IdP Groups to Catalog Groups</text>
<text x="430" y="44" text-anchor="middle" font-size="10" fill="#6b7594">Groups do not need to match. A mapping configuration defines the correspondence.</text>
<text x="430" y="60" text-anchor="middle" font-size="9"  fill="#b45309" font-style="italic">The group names below are illustrative examples only — actual names depend on each customer's setup.</text>

<!-- IdP column -->
<rect x="10" y="75" width="230" height="400" rx="6" fill="#eff6ff" stroke="#1a6fd4" stroke-width="2"/>
<text x="125" y="100" text-anchor="middle" font-size="11" font-weight="700" fill="#1a6fd4" font-family="IBM Plex Mono, monospace">IdP Groups</text>
<text x="125" y="116" text-anchor="middle" font-size="8.5" fill="#6b7594">Defined by IT / IAM team</text>

<rect x="24" y="132" width="202" height="46" rx="4" fill="#dbeafe" stroke="#1a6fd4" stroke-width="1.2"/>
<text x="125" y="153" text-anchor="middle" font-size="9.5" font-weight="600" fill="#1a4f9f" font-family="IBM Plex Mono, monospace">data-platform-engineers</text>
<text x="125" y="168" text-anchor="middle" font-size="8"   fill="#4a5278">IT / Data Engineering</text>

<rect x="24" y="188" width="202" height="46" rx="4" fill="#dbeafe" stroke="#1a6fd4" stroke-width="1.2"/>
<text x="125" y="209" text-anchor="middle" font-size="9.5" font-weight="600" fill="#1a4f9f" font-family="IBM Plex Mono, monospace">analysts-finance</text>
<text x="125" y="224" text-anchor="middle" font-size="8"   fill="#4a5278">Finance department</text>

<rect x="24" y="244" width="202" height="46" rx="4" fill="#dbeafe" stroke="#1a6fd4" stroke-width="1.2"/>
<text x="125" y="265" text-anchor="middle" font-size="9.5" font-weight="600" fill="#1a4f9f" font-family="IBM Plex Mono, monospace">analysts-marketing</text>
<text x="125" y="280" text-anchor="middle" font-size="8"   fill="#4a5278">Marketing department</text>

<rect x="24" y="300" width="202" height="46" rx="4" fill="#dbeafe" stroke="#1a6fd4" stroke-width="1.2"/>
<text x="125" y="321" text-anchor="middle" font-size="9.5" font-weight="600" fill="#1a4f9f" font-family="IBM Plex Mono, monospace">data-governance-leads</text>
<text x="125" y="336" text-anchor="middle" font-size="8"   fill="#4a5278">Data governance team</text>

<rect x="24" y="356" width="202" height="46" rx="4" fill="#dbeafe" stroke="#1a6fd4" stroke-width="1.2"/>
<text x="125" y="377" text-anchor="middle" font-size="9.5" font-weight="600" fill="#1a4f9f" font-family="IBM Plex Mono, monospace">it-admins</text>
<text x="125" y="392" text-anchor="middle" font-size="8"   fill="#4a5278">IT administrators</text>

<!-- Mapping center column -->
<rect x="300" y="75" width="260" height="400" rx="6" fill="#fffbeb" stroke="#b45309" stroke-width="2"/>
<text x="430" y="100" text-anchor="middle" font-size="11" font-weight="700" fill="#b45309" font-family="IBM Plex Mono, monospace">Mapping Config</text>
<text x="430" y="116" text-anchor="middle" font-size="8.5" fill="#6b7594">JSON / YAML / IdP UI / script config</text>

<rect x="313" y="128" width="234" height="22" rx="3" fill="#fef3c7"/>
<text x="430" y="143" text-anchor="middle" font-size="8" fill="#78350f" font-family="IBM Plex Mono, monospace">idp_group : catalog_group</text>

<rect x="313" y="156" width="234" height="32" rx="3" fill="#fef9e7" stroke="#b45309" stroke-width="0.5"/>
<text x="430" y="176" text-anchor="middle" font-size="8.5" fill="#92400e" font-family="IBM Plex Mono, monospace">data-platform-engineers -&gt; catalog-admins</text>

<rect x="313" y="194" width="234" height="32" rx="3" fill="#fef9e7" stroke="#b45309" stroke-width="0.5"/>
<text x="430" y="214" text-anchor="middle" font-size="8.5" fill="#92400e" font-family="IBM Plex Mono, monospace">analysts-finance -&gt; finance-readers</text>

<rect x="313" y="232" width="234" height="32" rx="3" fill="#fef9e7" stroke="#b45309" stroke-width="0.5"/>
<text x="430" y="252" text-anchor="middle" font-size="8.5" fill="#92400e" font-family="IBM Plex Mono, monospace">analysts-marketing -&gt; mkt-readers</text>

<rect x="313" y="270" width="234" height="32" rx="3" fill="#fef9e7" stroke="#b45309" stroke-width="0.5"/>
<text x="430" y="290" text-anchor="middle" font-size="8.5" fill="#92400e" font-family="IBM Plex Mono, monospace">data-governance-leads -&gt; data-stewards</text>

<rect x="313" y="308" width="234" height="32" rx="3" fill="#fef9e7" stroke="#b45309" stroke-width="0.5"/>
<text x="430" y="328" text-anchor="middle" font-size="8.5" fill="#92400e" font-family="IBM Plex Mono, monospace">it-admins -&gt; catalog-admins</text>

<rect x="313" y="358" width="234" height="96" rx="4" fill="#f5f6fa" stroke="#b8bfd8" stroke-width="1" stroke-dasharray="4,3"/>
<text x="430" y="378" text-anchor="middle" font-size="8.5" fill="#4a5278" font-weight="600">Cardinality rules</text>
<text x="430" y="396" text-anchor="middle" font-size="8"   fill="#6b7594">Many-to-one: multiple IdP groups</text>
<text x="430" y="411" text-anchor="middle" font-size="8"   fill="#6b7594">can map to the same Catalog group</text>
<text x="430" y="426" text-anchor="middle" font-size="8"   fill="#b45309">(data-platform-engineers + it-admins</text>
<text x="430" y="441" text-anchor="middle" font-size="8"   fill="#b45309">both -&gt; catalog-admins)</text>

<!-- Catalog groups column -->
<rect x="620" y="75" width="230" height="400" rx="6" fill="#f0faf5" stroke="#0a7c4e" stroke-width="2"/>
<text x="735" y="100" text-anchor="middle" font-size="11" font-weight="700" fill="#0a7c4e" font-family="IBM Plex Mono, monospace">Catalog Groups</text>
<text x="735" y="116" text-anchor="middle" font-size="8.5" fill="#6b7594">Defined by Catalog Admin</text>

<rect x="634" y="132" width="202" height="46" rx="4" fill="#dcfce7" stroke="#0a7c4e" stroke-width="1.2"/>
<text x="735" y="153" text-anchor="middle" font-size="9.5" font-weight="600" fill="#064e3b" font-family="IBM Plex Mono, monospace">catalog-admins</text>
<text x="735" y="168" text-anchor="middle" font-size="8"   fill="#4a5278">Full platform access</text>

<rect x="634" y="188" width="202" height="46" rx="4" fill="#dcfce7" stroke="#0a7c4e" stroke-width="1.2"/>
<text x="735" y="209" text-anchor="middle" font-size="9.5" font-weight="600" fill="#064e3b" font-family="IBM Plex Mono, monospace">finance-readers</text>
<text x="735" y="224" text-anchor="middle" font-size="8"   fill="#4a5278">Read finance domain</text>

<rect x="634" y="244" width="202" height="46" rx="4" fill="#dcfce7" stroke="#0a7c4e" stroke-width="1.2"/>
<text x="735" y="265" text-anchor="middle" font-size="9.5" font-weight="600" fill="#064e3b" font-family="IBM Plex Mono, monospace">mkt-readers</text>
<text x="735" y="280" text-anchor="middle" font-size="8"   fill="#4a5278">Read marketing domain</text>

<rect x="634" y="300" width="202" height="46" rx="4" fill="#dcfce7" stroke="#0a7c4e" stroke-width="1.2"/>
<text x="735" y="321" text-anchor="middle" font-size="9.5" font-weight="600" fill="#064e3b" font-family="IBM Plex Mono, monospace">data-stewards</text>
<text x="735" y="336" text-anchor="middle" font-size="8"   fill="#4a5278">Curate + validate assets</text>

<!-- Connector lines: IdP -> Mapping -->
<line x1="226" y1="155" x2="311" y2="172" stroke="#1a6fd4" stroke-width="1.2" stroke-dasharray="4,2" opacity="0.6"/>
<line x1="226" y1="211" x2="311" y2="210" stroke="#1a6fd4" stroke-width="1.2" stroke-dasharray="4,2" opacity="0.6"/>
<line x1="226" y1="267" x2="311" y2="248" stroke="#1a6fd4" stroke-width="1.2" stroke-dasharray="4,2" opacity="0.6"/>
<line x1="226" y1="323" x2="311" y2="286" stroke="#1a6fd4" stroke-width="1.2" stroke-dasharray="4,2" opacity="0.6"/>
<line x1="226" y1="379" x2="311" y2="324" stroke="#1a6fd4" stroke-width="1.2" stroke-dasharray="4,2" opacity="0.6"/>

<!-- Connector lines: Mapping -> Catalog -->
<line x1="547" y1="172" x2="632" y2="155" stroke="#0a7c4e" stroke-width="1.2" stroke-dasharray="4,2" opacity="0.6"/>
<line x1="547" y1="210" x2="632" y2="211" stroke="#0a7c4e" stroke-width="1.2" stroke-dasharray="4,2" opacity="0.6"/>
<line x1="547" y1="248" x2="632" y2="267" stroke="#0a7c4e" stroke-width="1.2" stroke-dasharray="4,2" opacity="0.6"/>
<line x1="547" y1="286" x2="632" y2="321" stroke="#0a7c4e" stroke-width="1.2" stroke-dasharray="4,2" opacity="0.6"/>
<!-- many-to-one: it-admins also -> catalog-admins -->
<line x1="547" y1="324" x2="632" y2="155" stroke="#b45309" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>
</svg>

<div class="note amber">
  <strong>Key constraint:</strong> Catalog Groups must be created in the platform before any provisioning is configured.
  The mapping must be documented and agreed upon by both the IT/IAM team (who own the IdP groups) and the
  Catalog Admin (who controls the Catalog groups and their permissions). Neither team can define the mapping alone.
</div>
</div>


<script>
function show(id, tab) {
  var wrap = tab.closest('.scim-diag');
  wrap.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  wrap.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  wrap.querySelector('#' + id).classList.add('active');
  tab.classList.add('active');
}
</script>

</div>
