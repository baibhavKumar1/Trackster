export default function RefinedFeatures() {
  return (
    <section className="py-48 px-10 bg-surface">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="space-y-8 group">
            <div className="aspect-[16/10] bg-surface-container-high rounded-lg overflow-hidden">
              <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" alt="Modern data visualization dashboard on dark screen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeBQs0Rn8IiqqkHAAvu_m_OJ6FCrf64b9rjMcP86BuDgyG09SgcOiMte3yA-Dt5uvMk2PEvJ-bLmBLW_rGKDsBYzRYAg9PK9focdxRb-m2_aMuwrsFHpxqnZgoxNVQ3Hqhpm-HRz24LzsCl8r-53kS3KPZmPBLtHlzk8GrwcZZIwR-h9RuZKjs-nH9mgYhmfwmWPbIIrSlermF0ECMYiQABGHt0Fjik9J0_6EHy1ptK0SWRP9QVlMHZCSaW7dIf-1J7Dfcn_y-hx0" />
            </div>
            <h3 className="text-3xl font-headline font-bold uppercase tracking-tighter">Live Analytics</h3>
            <p className="text-on-surface-variant font-body leading-relaxed">
              Monitor the pulse of your crowd in real-time. From entry velocity to bar trends, our engine processes data at the speed of the night.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="space-y-8 group translate-y-0 lg:translate-y-24">
            <div className="aspect-[16/10] bg-surface-container-high rounded-lg overflow-hidden">
              <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" alt="Stylized ticket graphics with neon borders" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD970u-5yfXCiF8nFEdPXzIoaNaxnMfw39boU02dctwlk6pfDVmu7eQQ6cY0vy2r8ATnTPaUOCbuoIhLYsBk2E4PGVPZmx5yypxSkct3LsM3pkWodJqQatjdEjDy-xmB92Y51d8yQal3qVnGkHpxArrbhuen5QQaqT6FT242xu5hFD74HhyuACnJ6hiNZsnQ9ALmZotbnmzmcp1FSaBWfg07jHFltp2ulBX-XXb7WsrhJaZG2aRF12wn7y-BRhSiCL4rBUtOndTKhk" />
            </div>
            <h3 className="text-3xl font-headline font-bold uppercase tracking-tighter">Smart Ticketing</h3>
            <p className="text-on-surface-variant font-body leading-relaxed">
              Dynamic pricing and anti-bot protocols ensure your tickets reach true fans. A seamless checkout that feels like part of the show.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="space-y-8 group">
            <div className="aspect-[16/10] bg-surface-container-high rounded-lg overflow-hidden">
              <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" alt="People standing in line under violet lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYNON57x0j7gsA0bRWgUDMNmn685bjKNflnmE5YnrU-Cpf7ePdJgacwBdTzqxW5u8-Oyxq1Wm7uKkzmiMF_SaNK7ay0jQZdytwuMJyJcn5vAWkPqMa3u-lR0dnDE4d04x7PJrUCwnKb_PWByD8VKDfkQ8od2pg45kNx_tkd1IGNVZE1FRy_aJh4idilziXezEbHGI6OolelnXLUdzo6ez2hkX-5XfOQIEfZYUX-vffAqHdcw4Q9qNCOMZSyh9Mrl7eO9IgLnbbj-k" />
            </div>
            <h3 className="text-3xl font-headline font-bold uppercase tracking-tighter">Instant Waitlists</h3>
            <p className="text-on-surface-variant font-body leading-relaxed">
              Sold out doesn&apos;t mean finished. Automate cancellations and re-orders through our intelligent queuing system.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
