const html = String.raw;

module.exports = {
  slug: "mechanics",
  number: "03",
  code: "Paper 3",
  title: "Further Mechanics",
  tone: "gold",
  summary:
    "Projectiles, rigid bodies, circular motion, elastic strings, variable forces, and momentum.",
  topics: [
    {
      slug: "motion-of-a-projectile",
      code: "3.1",
      title: "Motion of a projectile",
      summary: html`Horizontal speed stays constant. Vertical speed belongs to constant acceleration. Everything else is algebra on those two facts.`,
      points: [
        "Trajectory equation",
        "Range, greatest height, and time of flight",
        "The envelope of possible trajectories",
        "Range on an inclined plane",
      ],
      blocks: [
        {
          heading: "Two components",
          body: html`<p>With speed \(u\) at angle \(\theta\) above the horizontal, \(x=(u\cos\theta)t\) and \(y=(u\sin\theta)t-\tfrac12 gt^2\). Eliminate \(t\) and you get</p>
          <p>\[y=x\tan\theta-\frac{gx^2}{2u^2}(1+\tan^2\theta).\]</p>`,
        },
        {
          heading: "Envelope",
          body: html`<p>For a fixed \(u\), the boundary of every possible landing point is \(y=\dfrac{u^2}{2g}-\dfrac{gx^2}{2u^2}\). A point above that curve cannot be reached. A point on it is reached by exactly one angle.</p>`,
        },
        {
          heading: "An incline",
          body: html`<p>Measure the angle of projection from the incline, or resolve gravity into components along and perpendicular to the slope. The perpendicular displacement is zero on landing, and that equation gives the time, then the range.</p>`,
        },
      ],
      example: {
        prompt: html`A particle is projected at \(20\,\mathrm{m\,s^{-1}}\) at \(30^\circ\) above the horizontal. Find the range on horizontal ground. Take \(g=10\).`,
        steps: [
          html`Time of flight: \(0=(u\sin\theta)t-\tfrac12 gt^2\), so \(t=2u\sin\theta/g=2\cdot 20\cdot\tfrac12/10=2\) seconds.`,
          html`Range \(=(u\cos\theta)t=20\cdot\tfrac{\sqrt{3}}{2}\cdot 2=20\sqrt{3}\).`,
        ],
        answer: html`\(20\sqrt{3}\,\mathrm{m}\).`,
      },
      mistakes: [
        html`Using \(u\) rather than \(u\cos\theta\) as the horizontal speed.`,
        "Measuring the angle of projection from the vertical.",
        "Quoting the horizontal-ground range formula on a slope.",
      ],
      practice: [
        html`Show that the greatest height is \(\dfrac{u^2\sin^2\theta}{2g}\).`,
        html`Find the two possible angles of projection that give a range of \(30\,\mathrm{m}\) when \(u=20\,\mathrm{m\,s^{-1}}\) and \(g=10\).`,
      ],
    },
    {
      slug: "equilibrium-of-a-rigid-body",
      code: "3.2",
      title: "Equilibrium of a rigid body",
      summary: html`Forces sum to zero, and moments about any point sum to zero. The second condition is what a particle cannot give you.`,
      points: [
        "Moments of a force, including forces at an angle",
        "Centre of mass of a composite body",
        "Sliding and toppling",
        "Equilibrium of a ladder or a rod on supports",
      ],
      blocks: [
        {
          heading: "Moments",
          body: html`<p>The moment about a point is force times perpendicular distance from the point to the line of action. Take one sense as positive and keep it. In equilibrium, the total moment about every point is zero, so choose the point that removes an unknown, usually a support.</p>`,
        },
        {
          heading: "Centre of mass",
          body: html`<p>For a composite body, \(\bar{x}=\dfrac{\sum m_i x_i}{\sum m_i}\), and the same for \(y\). A missing piece is a negative mass. The weight then acts at the centre of mass.</p>`,
        },
        {
          heading: "Topple or slide",
          body: html`<p>On the point of toppling about an edge, the normal reaction has moved to that edge, so the weight's line of action passes through it. On the point of sliding, friction is \(\mu N\). Compare the angle, or the force, that causes each.</p>`,
        },
      ],
      example: {
        prompt: html`A uniform rod \(AB\) of weight \(W\) and length \(2a\) rests horizontally on supports at \(A\) and at its midpoint. Find the reactions.`,
        steps: [
          html`Let the reactions be \(R_A\) and \(R_M\). Vertically, \(R_A+R_M=W\).`,
          html`Moments about \(A\): the weight acts at distance \(a\), the midpoint reaction at distance \(a\). \(R_M\cdot a=W\cdot a\), so \(R_M=W\).`,
          html`Then \(R_A=0\). The support at \(A\) carries nothing while the rod is uniform and the other support is central. That is a useful check, not a suspicious answer.`,
        ],
        answer: html`\(R_A=0\), \(R_M=W\).`,
      },
      mistakes: [
        "Taking moments about a point and still including a force that passes through it.",
        "Using the slant distance instead of the perpendicular distance.",
        "Putting the weight anywhere other than the centre of mass.",
      ],
      practice: [
        html`A uniform ladder of weight \(W\) stands on rough horizontal ground and leans against a smooth vertical wall. The ladder makes \(60^\circ\) with the ground. Find the friction at the ground in terms of \(W\).`,
        html`A lamina is a square of side \(2a\) with a smaller square of side \(a\) removed from one corner. Find the centre of mass of what remains, measured from the opposite corner.`,
      ],
    },
    {
      slug: "circular-motion",
      code: "3.3",
      title: "Circular motion",
      summary: html`The acceleration towards the centre is \(v^2/r\), or \(r\omega^2\). Vertical circles also spend energy.`,
      points: [
        "Horizontal circles, banked tracks and the conical pendulum",
        "Vertical circles and the condition for a complete circle",
        "Energy on a vertical circle",
        "Leaving a surface",
      ],
      blocks: [
        {
          heading: "Towards the centre",
          body: html`<p>Resolve along the radius. The net force that way is \(mv^2/r\). It is not an extra force you draw on the diagram; it is the resultant of the real ones: tension, normal reaction, component of weight.</p>`,
        },
        {
          heading: "Vertical circles",
          body: html`<p>Mechanical energy is conserved if the only forces doing work are gravity and a normal reaction that does none. With the bottom as the zero of height, \(\tfrac12 mv^2=\tfrac12 mu^2-mgr(1-\cos\theta)\) for the usual angle from the downward vertical. Check the diagram before you trust a sign.</p>`,
        },
        {
          heading: "Leaving",
          body: html`<p>A particle on the outside of a smooth sphere leaves when the normal reaction reaches zero. A particle on a string goes slack when the tension reaches zero. Set that contact force to zero and solve together with energy.</p>`,
        },
      ],
      example: {
        prompt: html`A particle moves in a horizontal circle of radius \(0.5\,\mathrm{m}\) on a smooth table, tied to a fixed point by a string. The tension is \(8\,\mathrm{N}\) and the mass is \(0.2\,\mathrm{kg}\). Find the speed.`,
        steps: [
          html`The tension is the only horizontal force, so \(T=mv^2/r\).`,
          html`\(8=0.2\,v^2/0.5\), hence \(8=0.4 v^2\).`,
        ],
        answer: html`\(v=\sqrt{20}=2\sqrt{5}\,\mathrm{m\,s^{-1}}\).`,
      },
      mistakes: [
        html`Adding \(mv^2/r\) as a separate arrow on the free-body diagram.`,
        html`Using \(v^2/r\) radially and also leaving a component of weight out of that equation.`,
        "Setting tension to zero at the bottom of a vertical circle.",
      ],
      practice: [
        html`A conical pendulum of length \(l\) makes a constant angle \(\alpha\) with the downward vertical. Show that the period is \(2\pi\sqrt{l\cos\alpha/g}\).`,
        html`A particle hangs from a light inextensible string of length \(a\). It is given a horizontal speed \(u\) at the bottom. Find the least \(u\) for which it describes a complete circle.`,
      ],
    },
    {
      slug: "hookes-law",
      code: "3.4",
      title: "Hooke's law",
      summary: html`Tension is proportional to extension. Elastic energy is quadratic in the extension, which is why energy methods are the natural tool.`,
      points: [
        html`Hooke's law \(T=\lambda x/l\)`,
        html`Elastic potential energy \(\lambda x^2/(2l)\)`,
        "Vertical and horizontal oscillations about equilibrium",
        "Strings that go slack, as opposed to springs",
      ],
      blocks: [
        {
          heading: "The law",
          body: html`<p>For natural length \(l\) and modulus \(\lambda\), \(T=\dfrac{\lambda x}{l}\), where \(x\) is the extension. A spring can be compressed; an elastic string goes slack instead, and the tension is zero until it is stretched again.</p>`,
        },
        {
          heading: "Energy",
          body: html`<p>The elastic energy stored is \(\dfrac{\lambda x^2}{2l}\). It sits in the energy equation beside kinetic energy and gravitational potential energy. Choose a zero for gravitational potential and stick to it.</p>`,
        },
        {
          heading: "Equilibrium, then motion",
          body: html`<p>Find the extension \(e\) in equilibrium from \(T=mg\), so \(\lambda e/l=mg\). Measure displacement from that point. The restoring force is proportional to the extra extension, and the motion is simple harmonic with \(\omega^2=\lambda/(ml)\).</p>`,
        },
      ],
      example: {
        prompt: html`A light elastic string of natural length \(0.4\,\mathrm{m}\) and modulus \(20\,\mathrm{N}\) is fixed at the top. A particle of mass \(0.5\,\mathrm{kg}\) hangs in equilibrium. Find the extension. Take \(g=10\).`,
        steps: [
          html`In equilibrium, \(T=mg=5\).`,
          html`\(T=\lambda x/l=20x/0.4=50x\).`,
          html`\(50x=5\), so \(x=0.1\).`,
        ],
        answer: html`The extension is \(0.1\,\mathrm{m}\).`,
      },
      mistakes: [
        "Using the stretched length in place of the extension.",
        "Giving a string a tension when it is slack.",
        html`Using \(\tfrac12 kx^2\) without relating \(k\) to \(\lambda/l\).`,
      ],
      practice: [
        html`The particle in the example is pulled down a further \(0.1\,\mathrm{m}\) and released from rest. Find its speed as it passes through equilibrium.`,
        html`Show that small vertical oscillations about equilibrium have period \(2\pi\sqrt{ml/\lambda}\).`,
      ],
    },
    {
      slug: "linear-motion-under-a-variable-force",
      code: "3.5",
      title: "Linear motion under a variable force",
      summary: html`When the force depends on speed or position, \(F=ma\) becomes a differential equation. The form of \(a\) is the first choice you make.`,
      points: [
        html`\(a=\mathrm{d}v/\mathrm{d}t=v\,\mathrm{d}v/\mathrm{d}x\)`,
        "Resistance as a function of speed",
        "Separating variables",
        "Terminal velocity",
      ],
      blocks: [
        {
          heading: "Which acceleration",
          body: html`<p>Use \(\mathrm{d}v/\mathrm{d}t\) when the force is given in terms of time, or when you want \(v\) against \(t\). Use \(v\,\mathrm{d}v/\mathrm{d}x\) when the force is given in terms of \(x\), or when the question asks for speed at a position. A force in terms of \(v\) can go either way: \(m\,\mathrm{d}v/\mathrm{d}t=F(v)\) separates as \(m\,\mathrm{d}v/F(v)=\mathrm{d}t\).</p>`,
        },
        {
          heading: "Resistance",
          body: html`<p>A resisting force opposes velocity, so on the way down it points up. Write the positive direction once, then keep every term's sign. Terminal velocity is the speed at which the acceleration is zero, and it is often the cleanest way to identify a constant in the resistance law.</p>`,
        },
      ],
      example: {
        prompt: html`A particle of mass \(m\) falls from rest under gravity and a resistance \(mkv\). Find \(v\) in terms of \(t\). Take downwards as positive.`,
        steps: [
          html`\(m\,\mathrm{d}v/\mathrm{d}t=mg-mkv\), so \(\mathrm{d}v/\mathrm{d}t=g-kv\).`,
          html`Separate: \(\displaystyle\int_0^{v}\frac{\mathrm{d}u}{g-ku}=\int_0^{t}\mathrm{d}t\).`,
          html`\(-\dfrac1k\ln\dfrac{g-kv}{g}=t\), so \(\dfrac{g-kv}{g}=e^{-kt}\).`,
        ],
        answer: html`\(v=\dfrac{g}{k}\bigl(1-e^{-kt}\bigr)\). The terminal speed is \(g/k\).`,
      },
      mistakes: [
        html`Using \(v\,\mathrm{d}v/\mathrm{d}x\) and then integrating with respect to time.`,
        "Letting resistance point the same way as the motion.",
        "Forgetting the limits, so the constant of integration never gets fixed.",
      ],
      practice: [
        html`A particle moves in a straight line with acceleration \(2-2v\), and \(v=0\) when \(t=0\). Find \(v\) in terms of \(t\).`,
        html`Acceleration is \(-4x\) and the particle starts from rest at \(x=2\). Find \(v\) in terms of \(x\).`,
      ],
    },
    {
      slug: "momentum",
      code: "3.6",
      title: "Momentum",
      summary: html`Impulse changes momentum. In a collision of two particles, momentum along the line of impact is conserved if no external impulse acts, and Newton's law of restitution relates the separating speed to the approach speed.`,
      points: [
        "Impulse as the change of momentum",
        "Conservation of momentum",
        "Coefficient of restitution",
        "Oblique impact with a fixed surface",
      ],
      blocks: [
        {
          heading: "Impulse",
          body: html`<p> \(\mathbf{I}=\Delta(m\mathbf{v})\). A jerk from a string, or a blow, is an impulse: it changes momentum without a useful value of \(F\) over a tiny time. Weight is finite, so its impulse during an instantaneous collision is ignored.</p>`,
        },
        {
          heading: "Two particles",
          body: html`<p>Along the line of centres, \(m_1 u_1+m_2 u_2=m_1 v_1+m_2 v_2\), and \(v_2-v_1=e(u_1-u_2)\) with the positive direction fixed before you write the speeds. The restitution equation is about relative velocity, separation over approach.</p>`,
        },
        {
          heading: "A wall",
          body: html`<p>The component parallel to a smooth surface is unchanged. The component towards the surface reverses and is multiplied by \(e\). An oblique impact is those two facts drawn on one diagram.</p>`,
        },
      ],
      example: {
        prompt: html`A particle of mass \(2\,\mathrm{kg}\) moving at \(4\,\mathrm{m\,s^{-1}}\) hits a particle of mass \(1\,\mathrm{kg}\) moving the same way at \(1\,\mathrm{m\,s^{-1}}\). If \(e=\tfrac12\), find the speeds just after impact.`,
        steps: [
          html`Momentum: \(2\cdot 4+1\cdot 1=2v_1+v_2\), so \(2v_1+v_2=9\).`,
          html`Restitution: \(v_2-v_1=\tfrac12(4-1)=\tfrac32\).`,
          html`From the second, \(v_2=v_1+3/2\). Then \(2v_1+v_1+3/2=9\), so \(3v_1=15/2\) and \(v_1=2.5\). Then \(v_2=4\).`,
        ],
        answer: html`The \(2\,\mathrm{kg}\) particle moves at \(2.5\,\mathrm{m\,s^{-1}}\) and the \(1\,\mathrm{kg}\) particle at \(4\,\mathrm{m\,s^{-1}}\), both in the original direction.`,
      },
      mistakes: [
        html`Writing restitution as \(v_1-v_2\) and flipping the approach by accident.`,
        html`Conserving kinetic energy when \(e\neq 1\). Energy is conserved only for a perfectly elastic collision, and even then momentum is the safer first equation.`,
        "Changing the parallel component in an impact with a smooth wall.",
      ],
      practice: [
        html`A ball hits a smooth horizontal floor with speed \(u\) at \(45^\circ\) to the vertical, and \(e=\tfrac12\). Find the speed and direction just after impact.`,
        html`Show that the kinetic energy lost in a direct collision of two masses \(m\) and \(m\), with equal and opposite speeds \(u\) and restitution \(e\), is \(mu^2(1-e^2)\).`,
      ],
    },
  ],
};
