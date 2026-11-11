const html = String.raw;

module.exports = {
  slug: "statistics",
  number: "04",
  code: "Paper 4",
  title: "Further Probability & Statistics",
  tone: "ink",
  summary:
    "Continuous random variables, inference, chi-squared tests, rank tests, and probability generating functions.",
  topics: [
    {
      slug: "continuous-random-variables",
      code: "4.1",
      title: "Continuous random variables",
      summary: html`A density integrates to 1. Probabilities are areas. The mean is a weighted integral, not a sum.`,
      points: [
        html`Pdf and cdf, and the link \(f(x)=F'(x)\)`,
        "Mean, variance and median",
        "A function of a continuous random variable",
        "The rectangular and exponential distributions as working examples",
      ],
      blocks: [
        {
          heading: "Density",
          body: html`<p>\(f(x)\ge 0\) and \(\int_{-\infty}^{\infty} f(x)\,\mathrm{d}x=1\). Then \(P(a\le X\le b)=\displaystyle\int_a^b f\). A single point has probability zero, so strict and weak inequalities describe the same event.</p>`,
        },
        {
          heading: "Mean and variance",
          body: html`<p>\(E(X)=\displaystyle\int x f(x)\,\mathrm{d}x\) and \(E(X^2)=\displaystyle\int x^2 f(x)\,\mathrm{d}x\). Variance is \(E(X^2)-\bigl(E(X)\bigr)^2\). The median \(m\) solves \(F(m)=\tfrac12\).</p>`,
        },
        {
          heading: "A function of \(X\)",
          body: html`<p>\(E(g(X))=\displaystyle\int g(x)f(x)\,\mathrm{d}x\). To find the density of \(Y=g(X)\) when \(g\) is monotone, write the cdf \(P(Y\le y)=P(X\le g^{-1}(y))\) and differentiate. Do not forget the Jacobian factor, the derivative of the inverse.</p>`,
        },
      ],
      example: {
        prompt: html`\(f(x)=kx(4-x)\) for \(0\le x\le 4\), and 0 otherwise. Find \(k\), then \(E(X)\).`,
        steps: [
          html`\(\displaystyle\int_0^4 kx(4-x)\,\mathrm{d}x=k\Bigl[2x^2-\tfrac13 x^3\Bigr]_0^4=k\bigl(32-\tfrac{64}{3}\bigr)=\dfrac{32k}{3}=1\).`,
          html`So \(k=3/32\).`,
          html`\(E(X)=\displaystyle\int_0^4 x\cdot\tfrac{3}{32}x(4-x)\,\mathrm{d}x=\tfrac{3}{32}\displaystyle\int_0^4(4x^2-x^3)\,\mathrm{d}x=\tfrac{3}{32}\Bigl[\tfrac43 x^3-\tfrac14 x^4\Bigr]_0^4=2\).`,
        ],
        answer: html`\(k=3/32\) and \(E(X)=2\). The density is symmetric on \([0,4]\), so the mean sitting in the middle is a check.`,
      },
      mistakes: [
        "Forgetting to prove the density integrates to 1 before using it.",
        html`Computing \(E(X^2)\) as \(\bigl(E(X)\bigr)^2\).`,
        "Dropping the absolute value of the derivative when changing variables.",
      ],
      practice: [
        html`For the density above, find \(\mathrm{Var}(X)\) and the median.`,
        html`\(X\) has density \(e^{-x}\) for \(x>0\). Find the density of \(Y=X^2\).`,
      ],
    },
    {
      slug: "inference-using-normal-and-t",
      code: "4.2",
      title: "Inference using normal and t-distributions",
      summary: html`A confidence interval is a statement about the method. The \(t\)-distribution appears when the population variance is unknown and has to be estimated.`,
      points: [
        "Confidence intervals for a mean, variance known",
        html`The \(t\)-interval when the variance is estimated`,
        "Difference of two means",
        "Sample size for a given width",
      ],
      blocks: [
        {
          heading: "Known variance",
          body: html`<p>For a random sample from a normal population, or a large sample, \(\bar{X}\) is approximately \(N(\mu,\sigma^2/n)\). A 95% interval is \(\bar{x}\pm 1.96\,\sigma/\sqrt{n}\). The number 1.96 belongs to the standard normal, not to the data.</p>`,
        },
        {
          heading: "Unknown variance",
          body: html`<p>Replace \(\sigma\) by the sample standard deviation \(s\), and replace 1.96 by the two-tailed \(t\) critical value on \(n-1\) degrees of freedom. Say which \(s\) you are using: the one that divides by \(n-1\).</p>`,
        },
        {
          heading: "Two samples",
          body: html`<p>For independent samples with known variances, the variance of \(\bar{X}-\bar{Y}\) is \(\sigma_1^2/n_1+\sigma_2^2/n_2\). The interval is centred on \(\bar{x}-\bar{y}\). Paired data is different: form the differences first and treat them as one sample.</p>`,
        },
      ],
      example: {
        prompt: html`A sample of 16 observations has mean 52. The population is normal with standard deviation 4. Find a 95% confidence interval for the mean.`,
        steps: [
          html`Standard error \(=4/\sqrt{16}=1\).`,
          html`\(1.96\times 1=1.96\).`,
          html`Interval \(52\pm 1.96\).`,
        ],
        answer: html`\((50.04,\; 53.96)\).`,
      },
      mistakes: [
        html`Dividing by \(n\) instead of \(\sqrt{n}\).`,
        html`Using a \(z\) critical value after estimating \(\sigma\) from a small sample.`,
        "Treating paired differences as two independent samples.",
      ],
      practice: [
        html`The same sample, but \(\sigma\) unknown and \(s=4\), on 15 degrees of freedom. Write the interval in terms of the appropriate \(t\) critical value, and say where that value comes from.`,
        html`How large a sample do you need for a 95% interval of width 1, if \(\sigma=4\)?`,
      ],
    },
    {
      slug: "chi-squared-tests",
      code: "4.3",
      title: "Chi-squared tests",
      summary: html`Compare observed counts with expected counts. The test statistic is a sum of squared relative discrepancies, and it needs frequencies, not percentages.`,
      points: [
        "Goodness of fit",
        "Contingency tables and independence",
        "Degrees of freedom, including estimated parameters",
        "Combining classes when an expected frequency is too small",
      ],
      blocks: [
        {
          heading: "The statistic",
          body: html`<p>\[X^2=\sum\frac{(O-E)^2}{E}.\]</p>
          <p>Expected frequencies, not probabilities, go in the denominator. If a parameter of the model was estimated from the data, the degrees of freedom drop by one for each parameter estimated.</p>`,
        },
        {
          heading: "Goodness of fit",
          body: html`<p>Degrees of freedom are \((\text{number of classes})-1-(\text{parameters estimated})\). The \(-1\) is because the expected frequencies were forced to add up to the sample size. Combine neighbouring classes until each expected frequency is large enough to trust the approximation; five is the usual classroom threshold.</p>`,
        },
        {
          heading: "Contingency tables",
          body: html`<p>Under independence, \(E=\dfrac{(\text{row total})(\text{column total})}{\text{grand total}}\). For an \(r\times c\) table, degrees of freedom are \((r-1)(c-1)\). Yates's correction is a separate, optional adjustment for a 2 by 2 table; use it only when the question asks.</p>`,
        },
      ],
      example: {
        prompt: html`A die is rolled 60 times. The faces 1 through 6 appear 8, 12, 9, 11, 7 and 13 times. Test, at the 5% level, whether the die looks fair. The critical value of \(\chi^2_5\) at 5% is 11.070.`,
        steps: [
          html`Each expected frequency is 10.`,
          html`\(X^2=\dfrac{(8-10)^2}{10}+\dfrac{(12-10)^2}{10}+\dfrac{1}{10}+\dfrac{1}{10}+\dfrac{9}{10}+\dfrac{9}{10}=2.8\).`,
          html`\(2.8<11.070\), so the result is not significant.`,
        ],
        answer: html`Do not reject the hypothesis that the die is fair. The differences are the size chance produces.`,
      },
      mistakes: [
        "Using probabilities in place of expected frequencies.",
        "Forgetting to lose a degree of freedom for an estimated parameter.",
        "Leaving an expected frequency of 1.2 in its own class.",
      ],
      practice: [
        html`In a 2 by 3 contingency table, how many degrees of freedom does an independence test have, and why?`,
        html`A Poisson model is fitted to 5 classes and the mean is estimated from the data. Two end classes are then combined. How many degrees of freedom remain?`,
      ],
    },
    {
      slug: "non-parametric-tests",
      code: "4.4",
      title: "Non-parametric tests",
      summary: html`Tests that use signs or ranks when you do not want to assume a normal population.`,
      points: [
        "Sign test for a median",
        "Wilcoxon signed-rank test",
        "Wilcoxon rank-sum test for two independent samples",
        "How ties are handled, and when a normal approximation is used",
      ],
      blocks: [
        {
          heading: "Sign test",
          body: html`<p>Count how many observations fall above a hypothesised median, ignore exact equals, and compare the count with a binomial distribution of parameter \(\tfrac12\). The test uses direction only. It throws away the sizes, which is why it is simple and a little wasteful.</p>`,
        },
        {
          heading: "Signed rank",
          body: html`<p>Rank the absolute differences from the hypothesised median, then restore the signs. The test statistic is the smaller of the positive-rank sum and the negative-rank sum, or whichever of those your tables are built for. Read the table you actually have.</p>`,
        },
        {
          heading: "Two samples",
          body: html`<p>The Wilcoxon rank-sum test ranks all observations from both samples together. The statistic is the sum of the ranks in the smaller sample. A very small or very large sum means one sample is sitting systematically above the other.</p>`,
        },
      ],
      example: {
        prompt: html`Eight students' improvements, in marks, are \(3,-1,4,0,6,-2,5,2\). Use a sign test of the hypothesis that the median improvement is 0, against the alternative that it is positive. Ignore the zero.`,
        steps: [
          html`Of the seven non-zero values, five are positive.`,
          html`Under the null, the number of positives is \(B(7,\tfrac12)\).`,
          html`\(P(X\ge 5)=\bigl(\binom{7}{5}+\binom{7}{6}+\binom{7}{7}\bigr)/128=(21+7+1)/128=29/128\approx 0.227\).`,
        ],
        answer: html`The one-tailed \(p\)-value is about 0.23. There is no evidence, at a 5% level, of a positive median improvement.`,
      },
      mistakes: [
        "Ranking the signed values instead of ranking the absolute values.",
        "Counting a difference of zero as a sign.",
        "Using a two-tailed probability when the alternative was one-sided, or the other way round.",
      ],
      practice: [
        html`For the eight improvements above, rank the absolute non-zero differences and compute the positive rank sum.`,
        html`Explain, in two sentences, why a rank test can be preferred to a \(t\)-test for a small sample from a skewed population.`,
      ],
    },
    {
      slug: "probability-generating-functions",
      code: "4.5",
      title: "Probability generating functions",
      summary: html`The probabilities of a discrete random variable on \(0,1,2,\ldots\) are the coefficients of a polynomial or a power series. The mean and variance fall out of derivatives at \(t=1\).`,
      points: [
        html`Definition \(G(t)=E(t^X)\)`,
        html`Mean and variance from \(G'(1)\) and \(G''(1)\)`,
        "The pgf of a sum of independent variables",
        "Binomial, Poisson and geometric pgfs",
      ],
      blocks: [
        {
          heading: "Definition",
          body: html`<p>\(G(t)=\displaystyle\sum p_r t^r\). Then \(p_r\) is the coefficient of \(t^r\), and \(G(1)=1\) is a check. For a fair die numbered 1 to 6, \(G(t)=\tfrac16(t+t^2+\cdots+t^6)\).</p>`,
        },
        {
          heading: "Mean and variance",
          body: html`<p>\(E(X)=G'(1)\) and \(\mathrm{Var}(X)=G''(1)+G'(1)-\bigl(G'(1)\bigr)^2\). If \(G'(1)\) is an indeterminate \(\tfrac00\), take the limit, or expand \(G\) before differentiating.</p>`,
        },
        {
          heading: "Sums",
          body: html`<p>If \(X\) and \(Y\) are independent, the pgf of \(X+Y\) is \(G_X(t)G_Y(t)\). That is why the sum of independent Poissons is Poisson: the product of \(e^{\lambda(t-1)}\) and \(e^{\mu(t-1)}\) is \(e^{(\lambda+\mu)(t-1)}\).</p>`,
        },
      ],
      example: {
        prompt: html`\(X\) takes values 0, 1 and 2 with probabilities \(0.2\), \(0.5\) and \(0.3\). Find the mean from the pgf.`,
        steps: [
          html`\(G(t)=0.2+0.5t+0.3t^2\).`,
          html`\(G'(t)=0.5+0.6t\).`,
          html`\(G'(1)=1.1\).`,
        ],
        answer: html`\(E(X)=1.1\). Directly: \(0\cdot 0.2+1\cdot 0.5+2\cdot 0.3=1.1\).`,
      },
      mistakes: [
        html`Evaluating the derivative at \(t=0\) when the mean lives at \(t=1\).`,
        html`Using \(G''(1)\) on its own as the variance.`,
        "Multiplying pgfs for variables that are not independent.",
      ],
      practice: [
        html`For the distribution above, find \(\mathrm{Var}(X)\) from \(G\).`,
        html`The pgf of a binomial \(B(n,p)\) is \((q+pt)^n\), where \(q=1-p\). Recover the mean from this.`,
      ],
    },
  ],
};
