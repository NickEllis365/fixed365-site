// Ported as-is from v5-handoff/design/Fixed365 Website v5.dc.html.

export const CATS = [
  { name: 'Collaborate', color: '#2BA3D9', items: [
    ['Ex', 'Exchange Online', 'Email, calendars and shared mailboxes that just work.', ['Mailboxes, shared inboxes and distribution lists set up properly', 'Spam, phishing and spoofing protection tuned (SPF, DKIM, DMARC)', 'Moves from old servers or Google with no lost mail']],
    ['Tm', 'Teams', 'Chat, meetings and calling in one place.', ['Teams and channels structured around how you work', 'Guest access and external sharing kept under control', 'Teams Phone and meeting rooms configured']],
    ['Sp', 'SharePoint', 'Company files and intranet, organised.', ['Sites and libraries laid out so people find things', 'Permissions that match your teams, not one big free-for-all', 'File server and Dropbox migrations']],
    ['Od', 'OneDrive', 'Every user\'s files, synced and backed up.', ['Desktop and Documents redirected automatically', 'Sync health monitored across every device', 'Sharing links set to sensible defaults']]
  ]},
  { name: 'Secure', color: '#5ED1B6', items: [
    ['En', 'Entra ID', 'Who can sign in, from where, on what.', ['MFA for everyone, with no exceptions left open', 'Conditional Access blocking risky sign-ins', 'Joiners and leavers handled the same day']],
    ['Df', 'Defender', 'Threat protection for email, devices and accounts.', ['Defender for Business deployed to every device', 'Safe Links and Safe Attachments switched on', 'Alerts watched and acted on by us']],
    ['Pv', 'Purview', 'Keep sensitive data where it belongs.', ['Sensitivity labels for confidential files', 'Data loss prevention for card and personal data', 'Retention set to meet UK GDPR']],
    ['Ce', 'Cyber Essentials', 'Help getting certified, and staying certified.', ['Gap check against the Cyber Essentials requirements', 'Fixes made in Microsoft 365, Intune and Defender', 'Support with the questionnaire and yearly renewal']]
  ]},
  { name: 'Essentials', color: '#2BA3D9', items: [
    ['Dm', 'Domain hosting', 'Your domain names and DNS, looked after.', ['Domains registered and renewed so they never lapse', 'DNS records managed for your email and website', 'One place for it all, not logins scattered across old providers']],
    ['Es', 'Email security', 'Phishing and spam stopped before they reach anyone.', ['Phishing, malware and impersonation filtering', 'SPF, DKIM and DMARC set up and monitored', 'Suspicious messages quarantined and checked']],
    ['Bk', 'Backup', 'Your Microsoft 365 data, recoverable.', ['Mail, OneDrive, SharePoint and Teams backed up daily', 'Restores of a file or a whole mailbox on request', 'Tested so it works when you need it']]
  ]},
  { name: 'Manage', color: '#F2B84B', items: [
    ['In', 'Intune', 'Every laptop and phone, managed centrally.', ['Security policies and BitLocker on every laptop', 'Apps and updates pushed automatically', 'Lost device? Locked or wiped in minutes']],
    ['Ap', 'Autopilot', 'New laptops ready straight out of the box.', ['Ship a laptop direct to a new starter', 'They sign in and everything installs itself', 'No imaging, no setup visits']],
    ['Lc', 'Licensing', 'Pay for what you use, nothing more.', ['Right plan for each person (Basic, Standard, Premium)', 'Unused licences found and removed', 'Renewals and changes handled for you']],
    ['Az', 'Azure', 'Cloud servers and storage, without the server room.', ['Old on-site servers moved to Azure', 'Azure Virtual Desktop for remote working', 'Spend limits and cost alerts set up']]
  ]},
  { name: 'Automate', color: '#B49CF0', items: [
    ['Pa', 'Power Automate', 'Repetitive admin, done automatically.', ['Approvals, forms and notifications automated', 'Connect Microsoft 365 to the apps you already use', 'Built and documented by us']],
    ['Cp', 'Copilot', 'Microsoft\'s AI, rolled out safely.', ['Data permissions checked before switching it on', 'Licences for the people who\'ll actually use it', 'Practical training for your team']],
    ['Bi', 'Power BI', 'Your numbers in one dashboard.', ['Reports from Excel, SharePoint and your systems', 'Shared securely inside Microsoft 365', 'Refreshed automatically']]
  ]}
];

export const SVCS = [
  ['Migrate', 'Move email and files onto Microsoft 365 with no downtime.'],
  ['Secure', 'Lock down accounts, devices and data in layers.'],
  ['Manage devices', 'Every laptop and phone set up, patched and protected.'],
  ['Support', 'A real engineer who knows your setup, when you need one.']
];


export const TICKET = [['09:02', 'You report Outlook not syncing'], ['09:06', 'Picked up by your Fixed365 engineer'], ['09:19', 'Remote session, cause found'], ['09:41', 'Fixed and confirmed with you']];

export const DEVICES = ['Windows laptop', 'MacBook', 'iPhone', 'Windows laptop', 'Android phone', 'Surface tablet'];

export const SIZES = ['1–10', '11–25', '26–50', '50+'];


// Product symbol → logo file in public/logos/. Products without a logo show text only.
export const LOGOS = {
  Ex: 'exchange', Tm: 'teams', Sp: 'sharepoint', Od: 'onedrive',
  En: 'entra-id', Df: 'defender', Pv: 'purview',
  In: 'intune', Az: 'azure',
  Pa: 'power-automate', Cp: 'copilot', Bi: 'power-bi'
};

export const CAT_BLURBS = {
  Collaborate: 'Email, chat, meetings and files.',
  Secure: 'Sign-ins, threats, sensitive data and Cyber Essentials.',
  Essentials: 'Domains, email security and backups.',
  Manage: 'Laptops, phones, licences and cloud servers.',
  Automate: 'Less admin, better numbers, AI used sensibly.'
};

// Logos in the hero carousel (scrolls in this order, then loops).
export const HERO_LOGOS = [
  ['outlook', 'Outlook'], ['teams', 'Teams'], ['sharepoint', 'SharePoint'], ['onedrive', 'OneDrive'],
  ['exchange', 'Exchange'], ['entra-id', 'Entra ID'], ['intune', 'Intune'], ['defender', 'Defender'], ['purview', 'Purview'],
  ['azure', 'Azure'], ['power-automate', 'Power Automate'], ['power-bi', 'Power BI'], ['copilot', 'Copilot']
];

// Blocks of the interactive "F" in the hero: position/size in %, colour, and where each flies in from.
export const BLOCKS = [
  { l: 16.07, t: 16.07, w: 21.4, h: 67.9, c: 'var(--text)', from: 'translate(-70px,50px) rotate(-14deg)' },
  { l: 42.9, t: 16.07, w: 41.1, h: 19.6, c: 'var(--text)', from: 'translate(90px,-60px) rotate(18deg)' },
  { l: 42.9, t: 41.07, w: 26.8, h: 19.6, c: 'var(--text)', from: 'translate(-40px,-100px) rotate(-24deg)' },
  { l: 58.9, t: 64.3, w: 25, h: 19.6, c: '#2BA3D9', from: 'translate(130px,110px) rotate(40deg)' }
];
