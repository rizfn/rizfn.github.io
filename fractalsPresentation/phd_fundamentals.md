---
marp: true
theme: uncover
math: mathjax
paginate: true
_paginate: skip
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

# Modelling multi-species ecosystems

$\\$

Riz Fernando Noronha

---

### Predator-Prey Models

$\\$

<!-- ![bg left:60% fit](fig/phd_fundamentals/predator-prey_schematic.png) -->

<div class="columns">

![width:650px](fig/phd_fundamentals/predator-prey_schematic.png)


$$
\begin{align}
\frac{\mathrm{d}x}{\mathrm{d}t} &= \alpha x - \beta xy \\ \\
\frac{\mathrm{d}y}{\mathrm{d}t} &= \delta xy - \gamma y
\end{align}
$$


</div>



---

### How do we model many species??

$\\$

Every species (possibly) interacts with every other species

$N$ species implies $\sim N^2$ interactions!!


---

### On the Micro-scale?

<div class="columns">

<video src="fig/phd_fundamentals/t6ss_vibriocyclitrophicus_ordalii.mp4" autoplay muted loop></video>

- Type 6 Secretion System (**T6SS**)

- <span style="color:#EA4DC0">Vibrio cyclitrophicus</span>

- <span style="color:#00A9DC">Vibrio ordalii</span>

- Damages cell membrane (becomes circular)

</div>


---

### Real Microbial Communities

$\\$

T6SS is relatively **uncommon**

Microbes interact through chemicals

**Secretion** and **uptake**

---

<div class="columns">

<video src="fig/phd_fundamentals/lattice_anim_N_50_theta_0.1_1.mp4" autoplay muted loop style="max-width:100%;"></video>

<div>

### Lattice model
<br>

- Spatial patterning present

- Invasion between ecosystems?


</div>


</div>

---

![bg left:40% fit](fig/phd_fundamentals/and_model_schematic.png)

### 'AND' model

- Each species needs **2** chemicals to reproduce!

- Each species also secretes 2

- You **cannot** secrete what you need!

---

#### Lack of resource variety drives diversity?!

$\\$

![width:1150px](fig/phd_fundamentals/N_500_theta_0.01_k_2.png)

---

## Conclusion

$\\$

- Multi-species modelling is arbitrary!

- More work needed!
    - Analysis of mean-field results
    - Different behaviour in spatial model