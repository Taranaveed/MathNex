const html = String.raw;

module.exports = {
  slug: "further-pure-2",
  number: "02",
  code: "Paper 2",
  title: "Further Pure Mathematics 2",
  tone: "ember",
  summary:
    "Hyperbolic functions, eigenvalues, Maclaurin series, reduction formulae, complex numbers, and differential equations.",
  topics: [
    {
      slug: "hyperbolic-functions",
      code: "2.1",
      title: "Hyperbolic functions",
      summary: html`Sinh and cosh behave like sine and cosine with the signs tidied up, and both are built from exponentials.`,
      points: [
        html`Definitions of \(\sinh\), \(\cosh\) and \(\tanh\)`,
        html`Identities, including \(\cosh^2-\sinh^2=1\)`,
        "Inverse hyperbolics in logarithmic form",
        "Differentiation and integration",
      ],
      blocks: [
        {
          heading: "Definitions",
          body: html`<p>\(\sinh x=\dfrac{e^x-e^{-x}}{2}\), \(\cosh x=\dfrac{e^x+e^{-x}}{2}\), \(\tanh x=\dfrac{\sinh x}{\cosh x}\). Cosh is even and at least 1; sinh is odd.</p>`,
        },
        {
          heading: "The identity that replaces \(\cos^2+\sin^2\)",
          body: html`<p>\(\cosh^2 x-\sinh^2 x=1\). From it, \(1-\tanh^2 x=\operatorname{sech}^2 x\). Osborne's rule is a memory aid: write the trig identity, then flip the sign of any term that is a product of two sinhs.</p>`,
        },
        {
          heading: "Inverses",
          body: html`<p>\(\operatorname{arsinh} x=\ln\bigl(x+\sqrt{x^2+1}\bigr)\) and \(\operatorname{arcosh} x=\ln\bigl(x+\sqrt{x^2-1}\bigr)\) for \(x\ge 1\). Their derivatives are \(\dfrac{1}{\sqrt{x^2+1}}\) and \(\dfrac{1}{\sqrt{x^2-1}}\).</p>`,
        },
      ],
      example: {
        prompt: html`Solve \(3\sinh x-\cosh x=1\).`,
        steps: [
          html`Write both functions in exponentials: \(\tfrac32(e^x-e^{-x})-\tfrac12(e^x+e^{-x})=1\).`,
          html`Simplify: \(e^x-2e^{-x}=1\). Multiply by \(e^x\): \(e^{2x}-e^x-2=0\).`,
          html`Let \(u=e^x\). Then \(u^2-u-2=0\), so \(u=2\) or \(u=-1\). Only \(u=2\) is positive.`,
        ],
        answer: html`\(x=\ln 2\).`,
      },
      mistakes: [
        html`Using \(\cosh^2+\sinh^2=1\). The sign between them is minus.`,
        html`Accepting a negative value of \(e^x\).`,
        html`Forgetting that \(\operatorname{arcosh}\) is only defined for \(x\ge 1\).`,
      ],
      practice: [
        html`Show that \(\cosh 2x=\cosh^2 x+\sinh^2 x\).`,
        html`Differentiate \(\operatorname{artanh} x\) for \(|x|<1\), and write the result as a single fraction.`,
      ],
    },
    {
      slug: "matrices-2",
      code: "2.2",
      title: "Matrices",
      summary: html`Eigenvalues, eigenvectors, diagonalisation, and the Cayley–Hamilton theorem.`,
      points: [
        html`The characteristic equation \(\det(\mathbf{A}-\lambda\mathbf{I})=0\)`,
        "Eigenvectors for each eigenvalue",
        html`Diagonalisation \(\mathbf{A}=\mathbf{P}\mathbf{D}\mathbf{P}^{-1}\)`,
        "Cayley–Hamilton, and powers of a matrix",
      ],
      blocks: [
        {
          heading: "Eigenvalues",
          body: html`<p>Solve \(\det(\mathbf{A}-\lambda\mathbf{I})=0\). A repeated root still needs its own eigenvectors: you may find a full set, or you may not. You can diagonalise only when there are enough independent eigenvectors.</p>`,
        },
        {
          heading: "Diagonal form",
          body: html`<p>The columns of \(\mathbf{P}\) are the eigenvectors, and \(\mathbf{D}\) carries the eigenvalues in the same order. Then \(\mathbf{A}^n=\mathbf{P}\mathbf{D}^n\mathbf{P}^{-1}\), which is the reason diagonalisation earns its keep.</p>`,
        },
        {
          heading: "Cayley–Hamilton",
          body: html`<p>A matrix satisfies its own characteristic equation. For a 2 by 2 matrix that means a relation \(\mathbf{A}^2-(\operatorname{tr}\mathbf{A})\mathbf{A}+(\det\mathbf{A})\mathbf{I}=\mathbf{0}\), so higher powers can be reduced to \(\mathbf{I}\) and \(\mathbf{A}\).</p>`,
        },
      ],
      example: {
        prompt: html`Find the eigenvalues and unit-free eigenvectors of \(\begin{pmatrix}3&1\\ 0&2\end{pmatrix}\).`,
        steps: [
          html`\(\det\begin{pmatrix}3-\lambda&1\\ 0&2-\lambda\end{pmatrix}=(3-\lambda)(2-\lambda)=0\).`,
          html`Eigenvalues \(3\) and \(2\).`,
          html`For \(\lambda=3\), \((\mathbf{A}-3\mathbf{I})\mathbf{v}=\mathbf{0}\) gives \(v_2=0\), so an eigenvector is \(\begin{pmatrix}1\\ 0\end{pmatrix}\). For \(\lambda=2\), \(v_1+v_2=0\), so \(\begin{pmatrix}1\\ -1\end{pmatrix}\).`,
        ],
        answer: html`\(\lambda=3\) with \(\begin{pmatrix}1\\ 0\end{pmatrix}\), and \(\lambda=2\) with \(\begin{pmatrix}1\\ -1\end{pmatrix}\).`,
      },
      mistakes: [
        html`Putting eigenvalues into \(\mathbf{P}\) and eigenvectors into \(\mathbf{D}\).`,
        html`Ordering the columns of \(\mathbf{P}\) differently from the diagonal of \(\mathbf{D}\).`,
        "Declaring a repeated eigenvalue non-diagonalisable without checking the eigenspace.",
      ],
      practice: [
        html`Diagonalise \(\begin{pmatrix}4&1\\ 2&3\end{pmatrix}\), or explain why you cannot.`,
        html`Use Cayley–Hamilton to write \(\mathbf{A}^3\) in terms of \(\mathbf{A}\) and \(\mathbf{I}\) for a 2 by 2 matrix with trace 5 and determinant 6.`,
      ],
    },
    {
      slug: "differentiation",
      code: "2.3",
      title: "Differentiation",
      summary: html`Implicit and parametric derivatives, and Maclaurin series far enough to be useful.`,
      points: [
        "Implicit differentiation, including second derivatives",
        "Parametric differentiation",
        "Maclaurin series for standard functions",
        "Series for compound functions by substitution",
      ],
      blocks: [
        {
          heading: "Implicit",
          body: html`<p>Differentiate both sides with respect to \(x\), treating \(y\) as a function of \(x\). Every \(y\) term produces a factor \(\mathrm{d}y/\mathrm{d}x\). For the second derivative, differentiate again and substitute the first derivative back in.</p>`,
        },
        {
          heading: "Parametric",
          body: html`<p>\(\dfrac{\mathrm{d}y}{\mathrm{d}x}=\dfrac{\mathrm{d}y/\mathrm{d}t}{\mathrm{d}x/\mathrm{d}t}\). The second derivative is \(\dfrac{\mathrm{d}}{\mathrm{d}t}\bigl(\mathrm{d}y/\mathrm{d}x\bigr)\) divided by \(\mathrm{d}x/\mathrm{d}t\), not the derivative of that quotient with respect to \(t\) alone left unadjusted.</p>`,
        },
        {
          heading: "Maclaurin",
          body: html`<p>\(f(x)=f(0)+f'(0)x+\dfrac{f''(0)}{2!}x^2+\cdots\). Know the series for \(e^x\), \(\ln(1+x)\), \(\sin x\), \(\cos x\) and \((1+x)^n\). A function such as \(e^{\sin x}\) is built by putting one series inside another and keeping terms up to the order asked for.</p>`,
        },
      ],
      example: {
        prompt: html`Find the Maclaurin series of \(\tan x\) up to the term in \(x^3\).`,
        steps: [
          html`\(f(0)=0\). \(f'(x)=\sec^2 x\), so \(f'(0)=1\).`,
          html`\(f''(x)=2\sec^2 x\tan x\), so \(f''(0)=0\).`,
          html`\(f'''(x)=2\sec^2 x(\sec^2 x+2\tan^2 x)\) by the product rule, so \(f'''(0)=2\).`,
        ],
        answer: html`\(\tan x=x+\dfrac{1}{3}x^3+\cdots\).`,
      },
      mistakes: [
        html`Differentiating \(\mathrm{d}y/\mathrm{d}x\) with respect to \(t\) and forgetting to divide by \(\mathrm{d}x/\mathrm{d}t\).`,
        html`Using a series outside its interval of validity, such as \(\ln(1+x)\) at \(x=-1\).`,
        "Stopping the product or chain rule one derivative too soon in a Maclaurin calculation.",
      ],
      practice: [
        html`For \(x=\cos t\), \(y=\sin 2t\), find \(\mathrm{d}y/\mathrm{d}x\) and \(\mathrm{d}^2y/\mathrm{d}x^2\) at \(t=\pi/6\).`,
        html`Find the Maclaurin series of \(\ln(1+\sin x)\) up to \(x^3\).`,
      ],
    },
    {
      slug: "integration",
      code: "2.4",
      title: "Integration",
      summary: html`Reduction formulae, arc length, and the area of a surface of revolution.`,
      points: [
        "Reduction formulae from integration by parts",
        "Definite integrals evaluated by reducing the power",
        "Arc length in Cartesian, parametric and polar form",
        "Surface area of a solid of revolution",
      ],
      blocks: [
        {
          heading: "Reduction",
          body: html`<p>A formula such as \(I_n=\displaystyle\int_0^{\pi/2}\sin^n x\,\mathrm{d}x=\frac{n-1}{n}I_{n-2}\) comes from parts, with the boundary term vanishing. Reduce until you reach \(I_0\) or \(I_1\), which you can integrate directly.</p>`,
        },
        {
          heading: "Arc length",
          body: html`<p>Cartesian: \(\displaystyle\int\sqrt{1+\bigl(y'\bigr)^2}\,\mathrm{d}x\). Parametric: \(\displaystyle\int\sqrt{\dot x^2+\dot y^2}\,\mathrm{d}t\). Polar: \(\displaystyle\int\sqrt{r^2+\bigl(\mathrm{d}r/\mathrm{d}\theta\bigr)^2}\,\mathrm{d}\theta\).</p>`,
        },
        {
          heading: "Surfaces",
          body: html`<p>Rotating a Cartesian curve about the \(x\)-axis gives area \(\displaystyle 2\pi\int y\,\mathrm{d}s\), with \(\mathrm{d}s\) the arc element. Keep \(y\) as a length, not as \(y^2\): this is a surface, not a volume.</p>`,
        },
      ],
      example: {
        prompt: html`Given \(I_n=\displaystyle\int_0^{\pi/2}\sin^n x\,\mathrm{d}x\) and \(I_n=\dfrac{n-1}{n}I_{n-2}\), evaluate \(I_4\).`,
        steps: [
          html`\(I_4=\dfrac34 I_2\) and \(I_2=\dfrac12 I_0\).`,
          html`\(I_0=\displaystyle\int_0^{\pi/2}1\,\mathrm{d}x=\pi/2\).`,
          html`So \(I_2=\pi/4\) and \(I_4=3\pi/16\).`,
        ],
        answer: html`\(\dfrac{3\pi}{16}\).`,
      },
      mistakes: [
        html`Using the volume element \(y^2\) in a surface-area integral.`,
        html`Reducing \(I_n\) to the wrong parity, so you finish on an integral you did not compute.`,
        "Dropping the constant from integration by parts when the limits are not the friendly ones.",
      ],
      practice: [
        html`Find the arc length of \(x=a\cos^3 t\), \(y=a\sin^3 t\) from \(t=0\) to \(t=\pi/2\).`,
        html`Derive a reduction formula for \(I_n=\displaystyle\int x^n e^x\,\mathrm{d}x\).`,
      ],
    },
    {
      slug: "complex-numbers",
      code: "2.5",
      title: "Complex numbers",
      summary: html`De Moivre, roots of unity, and loci that are lines and circles in the Argand diagram.`,
      points: [
        "Modulus-argument form and de Moivre's theorem",
        "Roots of complex numbers",
        html`Exponential form \(re^{i\theta}\)`,
        html`Loci \(|z-a|=r\) and \(\arg(z-a)=\alpha\)`,
      ],
      blocks: [
        {
          heading: "De Moivre",
          body: html`<p>\((\cos\theta+i\sin\theta)^n=\cos n\theta+i\sin n\theta\). It turns trigonometric multiple angles into the imaginary or real part of a power, and it turns \(z^n=re^{i\theta}\) into \(n\) roots spaced by \(2\pi/n\).</p>`,
        },
        {
          heading: "Roots",
          body: html`<p>The \(n\)th roots of \(re^{i\theta}\) are \(r^{1/n}\exp\bigl(i(\theta+2k\pi)/n\bigr)\) for \(k=0,1,\ldots,n-1\). They sit at the vertices of a regular \(n\)-gon. Missing a value of \(k\) is the usual way to lose a root.</p>`,
        },
        {
          heading: "Loci",
          body: html`<p>\(|z-a|=|z-b|\) is the perpendicular bisector of \(a\) and \(b\). \(\arg\dfrac{z-a}{z-b}=\alpha\) is an arc of a circle through \(a\) and \(b\). Sketch the fixed points before you write a Cartesian equation.</p>`,
        },
      ],
      example: {
        prompt: html`Find the cube roots of \(-8\) in the form \(a+bi\).`,
        steps: [
          html`\(-8=8e^{i\pi}\), also \(8e^{i(\pi+2k\pi)}\).`,
          html`Roots: \(2\exp\bigl(i(\pi+2k\pi)/3\bigr)\) for \(k=0,1,2\).`,
          html`Arguments \(\pi/3\), \(\pi\), \(5\pi/3\). Values \(1+i\sqrt{3}\), \(-2\), \(1-i\sqrt{3}\).`,
        ],
        answer: html`\(1+i\sqrt{3}\), \(-2\), \(1-i\sqrt{3}\).`,
      },
      mistakes: [
        "Giving a single cube root because the real cube root is obvious.",
        "Measuring an argument from the origin when the locus is based at another point.",
        html`Adding \(2k\pi\) outside the root instead of inside.`,
      ],
      practice: [
        html`Express \(\cos 3\theta\) in terms of \(\cos\theta\) using de Moivre.`,
        html`Sketch \(|z-2|=|z+2i|\) and \(\arg(z-1)=\pi/4\) on the same diagram.`,
      ],
    },
    {
      slug: "differential-equations",
      code: "2.6",
      title: "Differential equations",
      summary: html`First-order equations by separating or by an integrating factor, and second-order equations with constant coefficients.`,
      points: [
        "Separable equations and homogeneous substitutions",
        html`Integrating factors for \(\mathrm{d}y/\mathrm{d}x+P(x)y=Q(x)\)`,
        "Complementary function and particular integral",
        "The cases when the usual trial integral is already in the complementary function",
      ],
      blocks: [
        {
          heading: "First order",
          body: html`<p>If \(\dfrac{\mathrm{d}y}{\mathrm{d}x}=f(x)g(y)\), separate and integrate both sides, then include one constant. If the equation is linear, the integrating factor is \(e^{\int P\,\mathrm{d}x}\). Multiply through, and the left side becomes the derivative of \(y\) times that factor.</p>`,
        },
        {
          heading: "Second order",
          body: html`<p>For \(a y''+by'+cy=f(x)\), solve the homogeneous equation first. Distinct real roots give \(Ae^{m_1 x}+Be^{m_2 x}\); a repeated root gives \((A+Bx)e^{mx}\); complex roots \(\alpha\pm i\beta\) give \(e^{\alpha x}(A\cos\beta x+B\sin\beta x)\).</p>`,
        },
        {
          heading: "Particular integrals",
          body: html`<p>Try a form that matches \(f(x)\): a polynomial, \(ke^{px}\), or \(p\cos qx+r\sin qx\). If that form already solves the homogeneous equation, multiply the trial by \(x\), and by \(x\) again if it still does.</p>`,
        },
      ],
      example: {
        prompt: html`Solve \(\dfrac{\mathrm{d}y}{\mathrm{d}x}+\frac{2}{x}y=x\), for \(x>0\).`,
        steps: [
          html`Integrating factor \(e^{\int 2/x\,\mathrm{d}x}=e^{2\ln x}=x^2\).`,
          html`\(\dfrac{\mathrm{d}}{\mathrm{d}x}(x^2 y)=x^3\).`,
          html`\(x^2 y=\dfrac14 x^4+C\), so \(y=\dfrac14 x^2+Cx^{-2}\).`,
        ],
        answer: html`\(y=\dfrac{x^2}{4}+\dfrac{C}{x^2}\).`,
      },
      mistakes: [
        "Forgetting the constant until the end and then adding it in the wrong place.",
        html`Using \(ke^{px}\) as a particular integral when \(e^{px}\) is already a complementary solution.`,
        html`Taking \(\int 2/x\,\mathrm{d}x=2\ln|x|\) and then dropping the square when you exponentiate.`,
      ],
      practice: [
        html`Solve \(y''-3y'+2y=e^{3x}\).`,
        html`Solve \(\dfrac{\mathrm{d}y}{\mathrm{d}x}=\dfrac{y}{x}+\dfrac{y^2}{x^2}\) by writing \(y=vx\).`,
      ],
    },
  ],
};
