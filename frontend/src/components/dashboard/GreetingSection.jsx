function getGreeting() {
  const h = new Date().getHours()
  if (h < 11) return 'Selamat Pagi'
  if (h < 15) return 'Selamat Siang'
  if (h < 18) return 'Selamat Sore'
  return 'Selamat Malam'
}

export default function GreetingSection({ userName, childName }) {
  const firstName = userName.split(' ')[0]

  return (
    <section className="px-6 pt-7 pb-5">
      <p className="text-[14px] text-gray-600 mb-2">
        {getGreeting()}, {firstName}
      </p>
      <h1 className="text-[26px] font-bold text-gray-900 leading-tight">
        Bagaimana Kabar {childName}?
      </h1>
    </section>
  )
}
