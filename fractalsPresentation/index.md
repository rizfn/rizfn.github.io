---
marp: true
theme: uncover
math: mathjax
paginate: true
_paginate: skip
# backgroundImage: url('fig/KU5.png')
backgroundSize: contain
style: |
        .columns {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.6rem;
        }
        h1, h2, h3, h4, h5, h6, strong {
          color: #400000;
        }
        .caption {
          font-size: 0.5em;
          line-height: 10%;
          letter-spacing: 0.01em;
          margin-top: -100px;
          margin-bottom: -100px;
        }

---


![bg 180% brightness:0.5 saturate:1](fig/julia_set.jpg)

<h1 style="color: #dfdfdf; text-shadow: 2px 2px 4px #400000;">Fractals: <br> The Language of Nature</h1>

$\\$

<span style="color: #dfdfdf; text-shadow: 2px 2px 4px #400000;">Riz Fernando Noronha</span>


---

![bg](fig/link_to_the_past_gameplay.png)
![bg](fig/legendofzelda-linktothepast-1639586882982.jpg)

---

## Sierpinski Triangle!

<br>

![width:1100px](fig/Sierpinski_triangle_evolution.svg.png)

---

### Karl Weierstrass


![bg left fit](fig/weierstrass.png) 

- Flunked out of university

- Hardly published

- Wrote in the _school newspaper_

- Still an exceptional mathematician!!



--- 

- Studied **continuity** and **differentiability**.

- Contested Ampere's "proof" that
   continuity $\rightarrow$ differentiability [(more complex)](https://hsm.stackexchange.com/questions/3480/is-kline-right-that-cauchy-believed-that-continuous-functions-must-be-differenti)

$$f(x) = \sum_{n=0}^\infty a^n \cos\left(b^n\pi x\right)$$

for $0\lt a\lt1$; $b$ is a positive odd integer; and
$ab \gt 1 + \frac32\pi$

---

### Weierstrass Function

![width:800px](fig/weierstrass_function.png)

---

![width:1150px](fig/weierstrass_reviews.png)

---

Cantor (?)

---

## 1918

- **Felix Hausdorff** introduces a 'Haussdorf dimension'

<br>

- **Pierre Fatou** and **Gaston Julia** study complex dynamics.
  Repeatedly *iterate* on a complex function.

---

## Benoit Mandelbrot


![bg left](fig/mandelbrot.jpg) 

- Born in 1924 in Warsaw
- Uneven education (WW2)
- Favoured **Visual** arguments over proofs!


---

![bg fit](fig/IUP/mandel_zoom/Mandel_zoom_00_mandelbrot_set.jpg)

---

Beautiful behaviour on zooming in!

![height:200px](fig/IUP/mandel_zoom/Mandel_zoom_00_mandelbrot_set.jpg) ![height:200px](fig/IUP/mandel_zoom/Mandel_zoom_01_head_and_shoulder.jpg) ![height:200px](fig/IUP/mandel_zoom/Mandel_zoom_02_seehorse_valley.jpg) ![height:200px](fig/IUP/mandel_zoom/Mandel_zoom_03_seehorse.jpg)

![height:200px](fig/IUP/mandel_zoom/Mandel_zoom_04_seehorse_tail.jpg) ![height:200px](fig/IUP/mandel_zoom/Mandel_zoom_05_tail_part.jpg) ![height:200px](fig/IUP/mandel_zoom/Mandel_zoom_06_double_hook.jpg) ![height:200px](fig/IUP/mandel_zoom/Mandel_zoom_07_satellite.jpg)


---

<iframe width="auto" height="1000px" src="https://marksmath.org/visualization/julia2.html" style="border: 1px solid #cccccc" frameborder=0>
</iframe>


--- 

![bg left:36.9%](fig/helge_von_koch.jpg)

## The Koch curve
<br>

Swedish (ew) mathematician
<br>

More *intuitive* version of Weierstrass's result, through **geometry**

---

## Construction

<iframe width="auto" height="1000px" src="https://rizfn.github.io/fractalsPresentation/koch_construction/" style="border: 1px solid #cccccc" frameborder=0>
</iframe>

---

<iframe width="auto" height="1000px" src="https://rizfn.github.io/fractalsPresentation/koch_measure/length.html" style="border: 1px solid #cccccc" frameborder=0>
</iframe>

---

<iframe width="auto" height="1000px" src="https://rizfn.github.io/fractalsPresentation/koch_measure/area.html" style="border: 1px solid #cccccc" frameborder=0>
</iframe>

---

<iframe width="auto" height="1000px" src="https://rizfn.github.io/fractalsPresentation/koch_construction/cesaro_multiple.html" style="border: 1px solid #cccccc" frameborder=0>
</iframe>

---

"Length" and "Area" are *useless* here.

$\\$
$\\$

We need a **new way** to measure!

---

### Box-counting

<iframe width="auto" height="1000px" src="https://rizfn.github.io/fractalsPresentation/box_count/" style="border: 1px solid #cccccc" frameborder=0>
</iframe>

---

<iframe width="auto" height="1000px" src="https://rizfn.github.io/fractalsPresentation/box_count/koch.html" style="border: 1px solid #cccccc" frameborder=0>
</iframe>

---

## Fractals in Nature!!

![height:500px](fig/IUP/Baobab_Tree_at_Vasai_Fort.jpg) ![height:500px](fig/IUP/Romanesco_broccoli_(Brassica_oleracea).jpg)

---

![bg fit](fig/IUP/yemen_dry_river_valleys.jpg)


---

### "Forgeries"

_Kevin Musgrave_ showed these at Yale in 1993.

![height:500px](fig/kevin_musgrave/Musgrave1.gif) ![height:500px](fig/kevin_musgrave/Musgrave3.gif)


---

![bg fit](fig/kevin_musgrave/Musgrave2.gif)


---

![bg right fit](fig/barnsley_fern.png)

#### Barnsley's Fern

<br>

Simple instructions!

---

## Fractals in biophysics

![height:500px](fig/david_johnson_dendrites_1.png) ![height:500px](fig/david_johnson_dendrites_2.png)

---

### It's just pushing!

![height:500px](fig/dp_pushing.png) ![height:500px](fig/david_johnson_dendrites_3.png)

---

![bg](fig/Marpat1.jpg)

![bg fit](fig/MARPAT_patent.png)

---

## Complex Physics

Simple rules, giving complex behaviour.

---

#### "Fractal" like scaling

<iframe width="auto" height="1000px" src="https://rizfn.github.io/fractalsPresentation/circles_powerlawdist/" style="border: 1px solid #cccccc" frameborder=0>
</iframe>


---

### Bureaucracy




---


![bg right](fig/SOC_kaleidoscope.png)

Add in the center!
<br>
Number of *times* a site topples

---

![bg height:90%](fig/SOC_hiddenfractals.png)

---

#### The Irony of Weierstrass

<div class="columns">


![height:500px](fig/IUP/Baobab_Tree_at_Vasai_Fort.jpg)

- > _Nature is simple, we shouldn't be biased by it!_
<br>
- Nature, as it turns out, is **NOT** smooth and simple!
<br>
- Fractals show up everywhere!

---

## Conclusion

> _I find the ideas in the fractals, both as a body of knowledge and as a metaphor, an incredibly important way of looking at the world._

<br> 
- Al Gore, discussing some of the "big think" questions that intrigue him


