export default function ArticleCard() {
  return (
    <section className="mx-5 mb-7 relative overflow-hidden rounded-[32px]">
      <div className="w-full h-[220px] bg-gradient-to-br from-[#587F74] to-[#3a5a51] flex items-end p-4">
        <div>
          <span className="inline-block bg-[#B7D8F1] text-primary rounded-full px-3 py-1.5 text-[12px] font-bold mb-3">
            Artikel Nutrisi
          </span>
          <h4 className="text-white text-[17px] font-bold leading-snug max-w-[260px]">
            Apa itu nutrisi?
            <br />
            Bagaimana cara memberi nutrisi kepada anak?
          </h4>
        </div>
      </div>
    </section>
  )
}
