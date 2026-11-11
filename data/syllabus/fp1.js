const html = String.raw;

module.exports = {
  slug: "further-pure-1",
  number: "01",
  code: "Paper 1",
  title: "Further Pure Mathematics 1",
  tone: "moss",
  summary:
    "Polynomials, series, matrices, polar curves, lines and planes, and proof by induction.",
  topics: [
    {
      slug: "roots-of-polynomial-equations",
      code: "1.1",
      title: "Roots of polynomial equations",
      summary: html`The coefficients already hold the sums and products of the roots, so a lot of questions never need the roots themselves.`,
      points: [
        "Relations between roots and coefficients for quadratics, cubics and quartics",
        "Symmetric functions such as the sum of squares",
        "A substitution that builds a new equation from a known one",
        "Unknown coefficients recovered from a condition on the roots",
      ],
      blocks: [
        {
          heading: "The relations",
          body: html`<p>For \(ax^3+bx^2+cx+d=0\) with roots \(\alpha,\beta,\gamma\),</p>
          <p>\[\sum\alpha=-\frac{b}{a},\qquad \sum\alpha\beta=\frac{c}{a},\qquad \alpha\beta\gamma=-\frac{d}{a}.\]</p>
          <p>The quadratic case is the same pattern: sum \(-b/a\), product \(c/a\). For a quartic, the next symmetric sum is the sum of products three at a time, and the sign keeps alternating.</p>`,
        },
        {
          heading: "Sums of powers",
          body: html`<p>Square the sum of the roots and peel off the cross terms:</p>
          <p>\[\sum\alpha^2=\Bigl(\sum\alpha\Bigr)^2-2\sum\alpha\beta.\]</p>
          <p>Cubes need one more identity, \(\sum\alpha^3=\bigl(\sum\alpha\bigr)^3-3\sum\alpha\sum\alpha\beta+3\alpha\beta\gamma\), which is worth deriving once rather than memorising in a panic.</p>`,
        },
        {
          heading: "A new equation",
          body: html`<p>If the new roots are \(k\) times the old ones, replace \(x\) by \(x/k\) in the original equation and clear the denominator. If the new roots are the old roots each increased by \(k\), replace \(x\) by \(x-k\).</p>`,
        },
      ],
      example: {
        prompt: html`The roots of \(2x^3-3x^2-11x+6=0\) are \(\alpha,\beta,\gamma\). Find \(\sum\alpha^2\), and the equation whose roots are \(2\alpha,2\beta,2\gamma\).`,
        steps: [
          html`\(\sum\alpha=3/2\) and \(\sum\alpha\beta=-11/2\).`,
          html`\(\sum\alpha^2=(3/2)^2-2(-11/2)=9/4+11=53/4\).`,
          html`The new roots are double the old ones, so set \(x=y/2\): \(2(y/2)^3-3(y/2)^2-11(y/2)+6=0\).`,
          html`That simplifies to \(y^3/4-3y^2/4-11y/2+6=0\). Multiply through by 4.`,
        ],
        answer: html`\(\sum\alpha^2=53/4\), and the new equation is \(y^3-3y^2-22y+24=0\).`,
      },
      mistakes: [
        html`The pairwise sum for a cubic is \(+c/a\), while the product is \(-d/a\). The signs are not all the same.`,
        html`\(\sum\alpha^2\) is not \(\bigl(\sum\alpha\bigr)^2\). The cross terms have to be removed.`,
        html`Substituting the wrong way round: if the new root is \(2\alpha\), the old \(x\) is the new variable divided by 2.`,
      ],
      practice: [
        html`For \(x^3-6x^2+11x-6=0\), find \(\sum\alpha^2\) from the coefficients only.`,
        html`The roots of \(x^3+px+q=0\) are \(\alpha,\beta,\gamma\). Show that \(\sum\alpha^2=-2p\), and write the equation with roots \(\alpha+1,\beta+1,\gamma+1\).`,
      ],
    },
    {
      slug: "rational-functions-and-graphs",
      code: "1.2",
      title: "Rational functions and graphs",
      summary: html`A rational graph is decided by its asymptotes, the sign of the function, and a handful of easy points.`,
      points: [
        "Proper and improper rational functions",
        "Vertical, horizontal and oblique asymptotes",
        "Stationary points and the shape of the curve",
        "Inequalities read from a sketch",
      ],
      blocks: [
        {
          heading: "Divide first",
          body: html`<p>If the numerator's degree is at least the denominator's, divide. An improper fraction such as \(\dfrac{x^2}{x-1}\) becomes \(x+1+\dfrac{1}{x-1}\). The quotient is the oblique asymptote; the remainder tells you which side of it the curve sits on.</p>`,
        },
        {
          heading: "Asymptotes",
          body: html`<p>Vertical asymptotes are the zeros of the denominator, once any common factor has been cancelled. A cancelled factor is a hole, not an asymptote. A horizontal asymptote appears only when the degrees match (ratio of leading coefficients) or the denominator wins (the asymptote is \(y=0\)).</p>`,
        },
        {
          heading: "How to sketch",
          body: html`<p>Mark asymptotes, intercepts, and any stationary points from \(\mathrm{d}y/\mathrm{d}x=0\). Then test a point in each interval the vertical asymptotes create. The sign chart stops the curve from crossing an asymptote by accident.</p>`,
        },
      ],
      example: {
        prompt: html`Sketch the main features of \(y=\dfrac{x^2}{x-1}\).`,
        steps: [
          html`Divide: \(y=x+1+\dfrac{1}{x-1}\).`,
          html`Vertical asymptote \(x=1\). Oblique asymptote \(y=x+1\). Intercept at the origin.`,
          html`\(\dfrac{\mathrm{d}y}{\mathrm{d}x}=1-\dfrac{1}{(x-1)^2}\), so stationary points when \((x-1)^2=1\), hence \(x=2\) and \(x=0\).`,
          html`The gradient changes from positive to negative at \(x=0\), so \((0,0)\) is a local maximum. It changes from negative to positive at \(x=2\), where \(y=4\), so \((2,4)\) is a local minimum.`,
        ],
        answer: html`Two branches, asymptotes \(x=1\) and \(y=x+1\), a local maximum at \((0,0)\) and a local minimum at \((2,4)\).`,
      },
      mistakes: [
        "Treating a cancelled factor as a vertical asymptote.",
        "Quoting a horizontal asymptote for an improper fraction that actually needs a slanted one.",
        "Joining the two sides of a vertical asymptote into one continuous stroke.",
      ],
      practice: [
        html`Find the asymptotes of \(y=\dfrac{x^2-4}{x+1}\) and the coordinates of any stationary points.`,
        html`Solve \(\dfrac{x}{x-2}>1\) with a sketch rather than by cross-multiplying blindly.`,
      ],
    },
    {
      slug: "summation-of-series",
      code: "1.3",
      title: "Summation of series",
      summary: html`Standard sums, the method of differences, and the habit of checking a general term against \(n=1\).`,
      points: [
        html`The standard results for \(\sum r\), \(\sum r^2\) and \(\sum r^3\)`,
        "Method of differences",
        "Partial fractions used to split a general term",
        "Convergent series and the sum to infinity",
      ],
      blocks: [
        {
          heading: "Three results you rebuild, not just recite",
          body: html`<p>\[\sum_{r=1}^{n} r=\frac{n(n+1)}{2},\qquad \sum_{r=1}^{n} r^2=\frac{n(n+1)(2n+1)}{6},\qquad \sum_{r=1}^{n} r^3=\Bigl(\frac{n(n+1)}{2}\Bigr)^2.\]</p>
          <p>A polynomial term such as \(r^2+3r\) is split and each piece is summed on its own.</p>`,
        },
        {
          heading: "Method of differences",
          body: html`<p>Write the general term as a difference \(f(r)-f(r+1)\) or \(f(r)-f(r+2)\). The sum then telescopes. Partial fractions are the usual way to find that difference: \(\dfrac{1}{r(r+1)}=\dfrac{1}{r}-\dfrac{1}{r+1}\).</p>`,
        },
        {
          heading: "Infinity",
          body: html`<p>A sum to infinity exists when the leftover terms tend to zero. For \(\sum\bigl(\tfrac{1}{r}-\tfrac{1}{r+1}\bigr)\) the partial sum is \(1-\dfrac{1}{n+1}\), so the infinite sum is 1.</p>`,
        },
      ],
      example: {
        prompt: html`Find \(\displaystyle\sum_{r=1}^{n}\frac{1}{r(r+2)}\) and its sum to infinity.`,
        steps: [
          html`Partial fractions: \(\dfrac{1}{r(r+2)}=\dfrac{1}{2}\Bigl(\dfrac{1}{r}-\dfrac{1}{r+2}\Bigr)\).`,
          html`Write out the first few and last few terms. Almost everything cancels, leaving \(\dfrac12\Bigl(1+\dfrac12-\dfrac{1}{n+1}-\dfrac{1}{n+2}\Bigr)\).`,
          html`As \(n\to\infty\) the last two fractions vanish.`,
        ],
        answer: html`\(\dfrac{3}{4}-\dfrac{2n+3}{2(n+1)(n+2)}\), and the infinite sum is \(\dfrac34\).`,
      },
      mistakes: [
        html`Using \(\sum r^2=\bigl(\sum r\bigr)^2\). That is the cube result, not the square result.`,
        html`Forgetting the factor from partial fractions, such as the \(\tfrac12\) above.`,
        "Cancelling a telescoping series too early and dropping an end term.",
      ],
      practice: [
        html`Evaluate \(\sum_{r=1}^{n}(r^2+2r)\) in terms of \(n\).`,
        html`Show that \(\sum_{r=1}^{n}\dfrac{1}{r(r+1)}=\dfrac{n}{n+1}\).`,
      ],
    },
    {
      slug: "matrices",
      code: "1.4",
      title: "Matrices",
      summary: html`Determinants, inverses, and three-by-three linear systems. A zero determinant means the system is not the tidy unique-solution kind.`,
      points: [
        "Determinant of a 3 by 3 matrix",
        "Inverse of a non-singular matrix",
        "Systems of three linear equations",
        "What a singular matrix says about the system",
      ],
      blocks: [
        {
          heading: "Determinant",
          body: html`<p>Expand along a row or column with the sign pattern \(+\,-\,+\). Each entry multiplies the determinant of the 2 by 2 matrix left behind. If two rows are proportional, the determinant is zero and the matrix has no inverse.</p>`,
        },
        {
          heading: "Inverse",
          body: html`<p>\[\mathbf{A}^{-1}=\frac{1}{\det\mathbf{A}}\operatorname{adj}\mathbf{A}.\]</p>
          <p>The adjugate is the transpose of the cofactor matrix. Check the result by multiplying back: you should recover \(\mathbf{I}\).</p>`,
        },
        {
          heading: "Linear systems",
          body: html`<p>Write \( \mathbf{A}\mathbf{x}=\mathbf{b} \). When \(\det\mathbf{A}\neq 0\), \(\mathbf{x}=\mathbf{A}^{-1}\mathbf{b}\) is the unique solution. When the determinant is zero, the system is either inconsistent or has infinitely many solutions, and you go back to the equations themselves to see which.</p>`,
        },
      ],
      example: {
        prompt: html`Find the inverse of \(\begin{pmatrix}1&2&1\\ 0&1&1\\ 1&0&1\end{pmatrix}\) and solve the system with right-hand side \((4,3,2)^{\mathsf T}\).`,
        steps: [
          html`Expanding the determinant: \(1(1)-2(-1)+1(-1)=1+2-1=2\).`,
          html`The cofactor matrix is \(\begin{pmatrix}1&1&-1\\ -2&0&2\\ 1&-1&1\end{pmatrix}\), so the adjugate is its transpose \(\begin{pmatrix}1&-2&1\\ 1&0&-1\\ -1&2&1\end{pmatrix}\).`,
          html`Inverse \(=\tfrac12\) of the adjugate. Multiply by \((4,3,2)^{\mathsf T}\): the entries are \((4-6+2)/2=0\), \((4-2)/2=1\) and \((-4+6+2)/2=2\).`,
        ],
        answer: html`\(\mathbf{x}=\begin{pmatrix}0\\ 1\\ 2\end{pmatrix}\). Check: \(\mathbf{A}\) times this vector returns \((4,3,2)^{\mathsf T}\).`,
      },
      mistakes: [
        "Forgetting to transpose the cofactor matrix.",
        html`Losing a sign in the \(+\,-\,+\) pattern.`,
        "Quoting a unique solution after you have already found a zero determinant.",
      ],
      practice: [
        html`For \(\begin{pmatrix}2&1&0\\ 1&2&1\\ 0&1&2\end{pmatrix}\), find the determinant and decide whether the matrix is invertible.`,
        html`Explain, without finding an inverse, why \(\begin{pmatrix}1&2&3\\ 2&4&6\\ 0&1&1\end{pmatrix}\) cannot have one.`,
      ],
    },
    {
      slug: "polar-coordinates",
      code: "1.5",
      title: "Polar coordinates",
      summary: html`Points as \((r,\theta)\), curves as \(r=f(\theta)\), and areas that are much kinder in polar than in Cartesian.`,
      points: [
        "Conversion between polar and Cartesian",
        html`Sketching cardiods, limaçons and roses from \(r=f(\theta)\)`,
        "Tangents at the pole",
        html`Area \(\tfrac12\int r^2\,\mathrm{d}\theta\)`,
      ],
      blocks: [
        {
          heading: "Conversion",
          body: html`<p>\(x=r\cos\theta\), \(y=r\sin\theta\), \(r^2=x^2+y^2\), and \(\tan\theta=y/x\) with a careful eye on the quadrant. A negative \(r\) means you face the opposite direction: \((-r,\theta)=(r,\theta+\pi)\).</p>`,
        },
        {
          heading: "Shape",
          body: html`<p>Test symmetry in the line \(\theta=0\) and in the pole. Where \(r=0\), the curve passes through the pole, and the values of \(\theta\) there are the directions of the tangents. A circle through the pole often looks like \(r=2a\cos\theta\).</p>`,
        },
        {
          heading: "Area",
          body: html`<p>The area swept from \(\theta=\alpha\) to \(\theta=\beta\) is \(\displaystyle\frac12\int_{\alpha}^{\beta} r^2\,\mathrm{d}\theta\). Square \(r\) before you integrate, and double the limits only when the curve really is symmetric over that range.</p>`,
        },
      ],
      example: {
        prompt: html`Find the area of one loop of \(r=a\sin 2\theta\), for \(a>0\).`,
        steps: [
          html`A loop runs from \(\theta=0\) to \(\theta=\pi/2\), where \(r\) returns to 0.`,
          html`Area \(=\dfrac12\int_0^{\pi/2} a^2\sin^2 2\theta\,\mathrm{d}\theta=\dfrac{a^2}{2}\int_0^{\pi/2}\dfrac{1-\cos 4\theta}{2}\,\mathrm{d}\theta\).`,
          html`That is \(\dfrac{a^2}{4}\Bigl[\theta-\dfrac14\sin 4\theta\Bigr]_0^{\pi/2}=\dfrac{a^2}{4}\cdot\dfrac{\pi}{2}\).`,
        ],
        answer: html`The area of one loop is \(\dfrac{\pi a^2}{8}\).`,
      },
      mistakes: [
        html`Integrating \(r\) instead of \(r^2\).`,
        html`Using \(\tan\theta=y/x\) and landing in the wrong quadrant.`,
        "Taking limits that cover two loops when the question asked for one.",
      ],
      practice: [
        html`Convert \(r=4\cos\theta\) to Cartesian form and name the curve.`,
        html`Find the area enclosed by \(r=a(1+\cos\theta)\).`,
      ],
    },
    {
      slug: "vectors",
      code: "1.6",
      title: "Vectors",
      summary: html`Lines and planes in three dimensions: where they meet, the angle between them, and the shortest distance.`,
      points: [
        "Equation of a line and of a plane",
        "Intersection of two lines, and of a line with a plane",
        "Angles between lines and planes",
        "Shortest distance from a point to a line or a plane",
      ],
      blocks: [
        {
          heading: "The two equations",
          body: html`<p>A line through \(\mathbf{a}\) with direction \(\mathbf{d}\) is \(\mathbf{r}=\mathbf{a}+\lambda\mathbf{d}\). A plane through \(\mathbf{a}\) with normal \(\mathbf{n}\) is \((\mathbf{r}-\mathbf{a})\cdot\mathbf{n}=0\), often written \( \mathbf{r}\cdot\mathbf{n}=p \).</p>`,
        },
        {
          heading: "Angles",
          body: html`<p>The angle between two directions satisfies \(\cos\phi=\dfrac{|\mathbf{d}_1\cdot\mathbf{d}_2|}{|\mathbf{d}_1||\mathbf{d}_2|}\) when the acute angle is wanted. The angle between a line and a plane is the complement of the angle between the line and the normal: \(\sin\theta=\dfrac{|\mathbf{d}\cdot\mathbf{n}|}{|\mathbf{d}||\mathbf{n}|}\).</p>`,
        },
        {
          heading: "Distance",
          body: html`<p>From a point with position \(\mathbf{b}\) to the plane \(\mathbf{r}\cdot\mathbf{n}=p\), the distance is \(\dfrac{|\mathbf{b}\cdot\mathbf{n}-p|}{|\mathbf{n}|}\). Two skew lines need the cross product of their directions as the common perpendicular.</p>`,
        },
      ],
      example: {
        prompt: html`The line \(\mathbf{r}=\begin{pmatrix}1\\0\\2\end{pmatrix}+\lambda\begin{pmatrix}2\\1\\-1\end{pmatrix}\) meets the plane \(x+y+2z=9\). Find the intersection.`,
        steps: [
          html`A general point on the line is \((1+2\lambda,\;\lambda,\;2-\lambda)\).`,
          html`Put it in the plane: \((1+2\lambda)+\lambda+2(2-\lambda)=9\).`,
          html`\(1+2\lambda+\lambda+4-2\lambda=9\), so \(\lambda+5=9\) and \(\lambda=4\).`,
        ],
        answer: html`The point is \((9,4,-2)\).`,
      },
      mistakes: [
        html`Using \(\cos\) for the angle between a line and a plane. That angle uses sine.`,
        "Dropping the absolute value and reporting a negative distance.",
        "Assuming two lines in 3D meet. They may be skew.",
      ],
      practice: [
        html`Find the angle between the planes \(\mathbf{r}\cdot(1,2,2)=5\) and \(\mathbf{r}\cdot(2,-1,2)=3\).`,
        html`Find the distance from \((1,2,3)\) to the plane \(2x-y+2z=4\).`,
      ],
    },
    {
      slug: "proof-by-induction",
      code: "1.7",
      title: "Proof by induction",
      summary: html`A base case, a hypothesis, and a step that uses the hypothesis honestly. Induction is a shape of argument, not a single formula.`,
      points: [
        "Sums and products",
        "Divisibility",
        "Matrices and recurrence relations",
        "Inequalities, with a base case that is late enough",
      ],
      blocks: [
        {
          heading: "The shape",
          body: html`<p>Show the statement is true for a starting integer \(n_0\). Assume it for \(n=k\). Deduce it for \(n=k+1\), and say that it follows for every integer \(n\ge n_0\). The last sentence is part of the proof.</p>`,
        },
        {
          heading: "Where the hypothesis goes",
          body: html`<p>In a sum, the \(n=k+1\) case is the \(n=k\) sum plus the next term. Replace only the sum you assumed, then algebra the extra term into the formula you want. In a divisibility proof, write the \(k+1\) expression as a multiple of the \(k\) expression plus something you can factor.</p>`,
        },
        {
          heading: "Inequalities",
          body: html`<p>The inductive step often needs \(k\) already larger than some value. If the algebra needs \(k\ge 4\), check the base cases up to 4 by hand and start the induction there.</p>`,
        },
      ],
      example: {
        prompt: html`Prove that \(\displaystyle\sum_{r=1}^{n} r\cdot r!=(n+1)!-1\) for every positive integer \(n\).`,
        steps: [
          html`Base: \(n=1\) gives \(1\cdot 1!=1\) and \(2!-1=1\).`,
          html`Assume \(\sum_{r=1}^{k} r\cdot r!=(k+1)!-1\).`,
          html`Add the next term: the sum to \(k+1\) is \((k+1)!-1+(k+1)\cdot(k+1)!=(k+1)!(1+k+1)-1=(k+2)!-1\).`,
        ],
        answer: html`True for \(n=1\), and true for \(k\) implies true for \(k+1\), so it holds for every positive integer \(n\).`,
      },
      mistakes: [
        html`Assuming the result for every \(n\), which is the thing being proved.`,
        "Checking only the base case and calling that a proof.",
        html`Starting at \(n=1\) when the inductive step is false for small \(k\).`,
      ],
      practice: [
        html`Prove by induction that \(3^{2n}-1\) is divisible by 8 for every positive integer \(n\).`,
        html`Prove that \(\sum_{r=1}^{n} r^3=\bigl(\tfrac{n(n+1)}{2}\bigr)^2\).`,
      ],
    },
  ],
};
