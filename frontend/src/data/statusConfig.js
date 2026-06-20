const statusConfig = {
  aman: {
    label: 'Aman',
    badgeLabel: 'AMAN',
    color: '#4CAF50',
    badgeBg: '#E6F6E7',
  },
  pantau: {
    label: 'Perlu Pemantauan',
    badgeLabel: 'PANTAU',
    color: '#FFB300',
    badgeBg: '#FFF5D9',
  },
  konsultasi: {
    label: 'Perlu Konsultasi',
    badgeLabel: 'KONSULTASI',
    color: '#EA6A6A',
    badgeBg: '#FFE2E2',
  },
}

export function getStatusConfig(status) {
  return statusConfig[status] || statusConfig.aman
}

export default statusConfig
