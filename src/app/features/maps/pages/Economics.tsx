'use client';

import React from 'react';

const Economics = () => (
<!DOCTYPE html>

<html lang="en">
<head><script src="https://cdn.tailwindcss.com"></script>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>First Floor – Pilbara &amp; Goldfields: Economics</title>
<!-- Bootstrap 5 -->


</head>
<body>
<h1 class="floor-title text-center">
    First Floor Pilbara and Goldfields: Economics
  </h1>
<!-- Horizontal scroll container -->
<div class="overflow-auto w-100">
<div class="d-inline-block">
<!-- =========== ① Top Section: Circle 101 + Made-up desk + 102~121 =========== -->
<div class="d-flex align-items-start">
<!-- Circular Case Study Room 101 -->
<div class="flex-shrink-0 d-flex justify-content-center align-items-center" style="min-width:260px; min-height:260px">
<div class="room-box rounded-circle d-flex flex-column justify-content-center align-items-center" id="R101" style="width:220px; height:220px; border:2px solid #888">
<p class="room mb-0 text-center">Case Study Room 101</p>
<p class="name mb-0 text-center">
              Don Voelte &amp; Nancy Keegan<br/>Case Study Room
            </p>
<p class="key-locker mb-0 text-success">591201</p>
</div>
</div>
<!-- Right side: Red bar + Room row -->
<div class="d-flex flex-column">
<!-- Made-up desk horizontal bar -->
<div class="madeup-desk-bar align-self-center my-1">
            Made up desk – Damian Lenzo
          </div>
<!-- 102-121 single row -->
<div class="d-flex flex-nowrap">
<!-- 102A / 102L -->
<div class="d-flex flex-column">
<div class="room-box" id="R102A">
<div class="room">102A</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box" id="R102L">
<div class="room">102L</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
</div>
<!-- 102B / 102M -->
<div class="d-flex flex-column ms-2">
<div class="room-box" id="R102B">
<div class="room">102B</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box yellow-box" id="R102M">
<div class="room">102M</div>
<div class="name">VACANT</div>
</div>
</div>
<!-- 102C / 102N -->
<div class="d-flex flex-column ms-2">
<div class="room-box" id="R102C">
<div class="room">102C</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box yellow-box" id="R102N">
<div class="room">102N</div>
<div class="name">VACANT</div>
</div>
</div>
<!-- 102D / 102O -->
<div class="d-flex flex-column ms-2">
<div class="room-box" id="R102D">
<div class="room">102D</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box yellow-box" id="R102O">
<div class="room">102O</div>
<div class="name">VACANT</div>
</div>
</div>
<!-- 102E / 102P -->
<div class="d-flex flex-column ms-2">
<div class="room-box" id="R102E">
<div class="room">102E</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box" id="R102P">
<div class="room">102P</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
</div>
<!-- 102F / 102Q -->
<div class="d-flex flex-column ms-2">
<div class="room-box" id="R102F">
<div class="room">102F</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box" id="R102Q">
<div class="room">102Q</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
</div>
<!-- 102G / 102R -->
<div class="d-flex flex-column ms-2">
<div class="room-box" id="R102G">
<div class="room">102G</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box" id="R102R">
<div class="room">102R</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
</div>
<!-- 102H / 102S -->
<div class="d-flex flex-column ms-2">
<div class="room-box" id="R102H">
<div class="room">102H</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box" id="R102S">
<div class="room">102S</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
</div>
<!-- 102I / 102T -->
<div class="d-flex flex-column ms-2">
<div class="room-box" id="R102I">
<div class="room">102I</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box" id="R102T">
<div class="room">102T</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
</div>
<!-- 102J / 102U -->
<div class="d-flex flex-column ms-2">
<div class="room-box" id="R102J">
<div class="room">102J</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box" id="R102U">
<div class="room">102U</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
</div>
<!-- 102K / 102V -->
<div class="d-flex flex-column ms-2">
<div class="room-box" id="R102K">
<div class="room">102K</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box" id="R102V">
<div class="room">102V</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
</div>
<!-- 113 / 115 / 117 / 121 -->
<div class="d-flex ms-2">
<div class="room-box" id="R113">
<div class="room">113</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591317</p>
</div>
<div class="room-box ms-2" id="R115">
<div class="room">115</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591321</p>
</div>
<div class="room-box ms-2" id="R117">
<div class="room">117</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591323</p>
</div>
<div class="position-relative ms-2">
<div class="room-box ms-2 border-2 border-danger text-danger" id="R121">
<div class="room">121</div>
<div class="name">Print Room</div>
<div class="key-locker">591201</div>
<p class="ptr">PTR 386</p>
<p class="printer-serial">Serial # SAA2J04101569</p>
</div>
<i class="fa-solid fa-restroom fa-3x position-absolute toilet-icon toilet-121"></i>
</div>
</div>
<!-- /113-121 -->
</div>
<!-- /102-121 single row -->
</div>
<!-- /Right side flex-column -->
</div>
<!-- End of Top Section --------------------------------------------------- -->
<!-- =========== ② Second Section: 103-116 + Kitchen (same as old version) =========== -->
<div class="d-flex align-items-stretch mt-4">
<!-- Left space aligned with 102A -->
<div style="min-width:260px"></div>
<div class="d-flex flex-wrap">
<!-- 103-116 Rooms -->
<!-- Only listing key rooms, others can be added as needed -->
<div class="room-box" id="R103">
<div class="room">103</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591309</p>
</div>
<div class="room-box ms-2" id="R104">
<div class="room">104</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591310</p>
</div>
<div class="room-box ms-2" id="R105">
<div class="room">105</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591311</p>
</div>
<div class="room-box ms-2" id="R106">
<div class="room">106</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591312</p>
</div>
<div class="room-box ms-2" id="R107">
<div class="room">107</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591313</p>
</div>
<div class="room-box ms-2" id="R108">
<div class="room">108</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591314</p>
</div>
<div class="room-box ms-2" id="R109">
<div class="room">109</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591315</p>
</div>
<div class="room-box ms-2" id="R110">
<div class="room">110</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>59318</p>
</div>
<div class="room-box ms-2" id="R111">
<div class="room">111</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591319</p>
</div>
<div class="room-box ms-2" id="R112">
<div class="room">112</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591320</p>
</div>
<div class="room-box ms-2" id="R114">
<div class="room">114</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591322</p>
</div>
<div class="room-box ms-2" id="R116">
<div class="room">116</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591324</p>
</div>
<!-- Vertical Kitchen -->
<div class="d-flex flex-column justify-content-center align-items-center ms-2">
<div class="kitchen-box fw-bold d-flex align-items-center justify-content-center" style="min-width:32px; min-height:80px; background:#fff; border:1px solid #333; writing-mode: vertical-rl; text-align:center;">
<div class="room">Kitchen</div>
</div>
</div>
</div>
</div>
<!-- End of Second Section -------------------------------------------------- -->
<!-- =========== ③ Third Section: 127-132 + 3×3 Vacant + Large white box =========== -->
<div class="d-flex align-items-start mt-4">
<div style="min-width:260px"></div>
<div class="d-flex flex-column">
<div class="room-box" id="R127">
<div class="room">127</div>
<div class="name">{name}</div>
<p class="key-locker">Key Locker<br/>591325</p>
</div>
<div class="room-box mt-2" id="R128">
<div class="room">128</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591326</p>
</div>
<div class="room-box mt-2" id="R129">
<div class="room">129</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591327</p>
</div>
<!-- 3×3 Vacant grid -->
<div class="d-grid gap-1 mt-2" style="grid-template-columns:repeat(3,1fr)">
<div class="room-box yellow-box" id="R130A">
<div class="room">130A</div>
<div class="name">VACANT</div>
</div>
<div class="room-box yellow-box" id="R130B">
<div class="room">130B</div>
<div class="name">VACANT</div>
</div>
<div class="room-box yellow-box" id="R130C">
<div class="room">130C</div>
<div class="name">VACANT</div>
</div>
<div class="room-box yellow-box" id="R130D">
<div class="room">130D</div>
<div class="name">VACANT</div>
</div>
<div class="room-box yellow-box" id="R130E">
<div class="room">130E</div>
<div class="name">VACANT</div>
</div>
<div class="room-box yellow-box" id="R130F">
<div class="room">130F</div>
<div class="name">VACANT</div>
</div>
<div class="room-box yellow-box" id="R130G">
<div class="room">130G</div>
<div class="name">VACANT</div>
</div>
<div class="room-box yellow-box" id="R130H">
<div class="room">130H</div>
<div class="name">VACANT</div>
</div>
<div class="room-box bg-warning" id="R130I">
<div class="room">130I</div>
<div class="name">{name}</div>
</div>
</div>
<div class="room-box mt-2" id="R131">
<div class="room">131</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591328</p>
</div>
<div class="room-box mt-2" id="R132">
<div class="room">132</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591329</p>
</div>
</div>
<!-- Right side large white box -->
<div class="flex-grow-1 border border-3 ms-3" style="background:#fff; height:100%; min-height:600px; max-width:700px"></div>
</div>
<!-- End of Third Section -------------------------------------------------- -->
<!-- =========== ④ Fourth/Fifth Section: Circular 142 + 144-155 =========== -->
<div class="d-flex align-items-start mt-4">
<!-- Circular 142 -->
<div class="flex-shrink-0 d-flex justify-content-center align-items-center" style="min-width:260px; min-height:260px">
<div class="room-box rounded-circle d-flex flex-column justify-content-center align-items-center" id="R142" style="width:220px; height:220px; border:2px solid #000">
<div class="room">Case Study Room 142</div>
<div class="name">Sir Rod Eddington<br>Case Study Room</br></div>
<p class="key-locker text-success">Key Locker<br/>591201</p>
</div>
</div>
<!-- Right side 144-155 main area -->
<div class="d-flex flex-column">
<!-- Top row 144-150 + Kitchen + WC icon -->
<div class="d-flex align-items-end">
<!-- Printer block -->
<div class="d-flex align-items-center justify-content-center me-2" style="
                min-width:120px;
                min-height:80px;
                background:#fff;
                border:1px solid #ccc;
              ">
<span class="text-danger text-center" style="font-size:15px">
<p class="ptr">PTR 384</p>
<p class="printer-serial">Serial # SAA2J041015473</p>
</span>
</div>
<!-- 144-150 -->
<div class="room-box" id="R144">
<div class="room">144</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591330</p>
</div>
<div class="room-box ms-2" id="R145">
<div class="room">145</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591331</p>
</div>
<div class="room-box ms-2" id="R146">
<div class="room">146</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591332</p>
</div>
<div class="room-box ms-2" id="R147">
<div class="room">147</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591333</p>
</div>
<div class="room-box ms-2" id="R148">
<div class="room">148</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591334</p>
</div>
<div class="room-box ms-2" id="R149">
<div class="room">149</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591335</p>
</div>
<div class="room-box ms-2" id="R150">
<div class="room">150</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591337</p>
</div>
<!-- Kitchen & WC -->
<div class="d-flex flex-column justify-content-center align-items-center ms-2">
<div class="kitchen-box fw-bold d-flex align-items-center justify-content-center" style="min-width:32px; min-height:80px; background:#fff; border:1px solid #333; writing-mode: vertical-rl; text-align:center;">
<div class="room">Kitchen</div>
</div>
</div>
</div>
<!-- Restroom icon under room 150 -->
<div class="d-flex justify-content-end mt-3 me-5 pe-4">
<i class="fa-solid fa-restroom fa-2x"></i>
</div>
<!-- Bottom row 143A-J + 151 + 155 restructured -->
<div class="d-flex align-items-start mt-3">
<!-- Left side: 143L/K + 143A-J -->
<div class="d-flex">
<!-- 143L / 143K vertical stack -->
<div class="d-flex flex-column">
<div class="room-box" id="R143L">
<div class="room">143L</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box mt-0" id="R143K">
<div class="room">143K</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
</div>
<!-- 143A-J two rows -->
<div class="d-flex flex-column ms-2">
<div class="d-flex flex-wrap">
<div class="room-box" id="R143A">
<div class="room">143A</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box ms-2" id="R143B">
<div class="room">143B</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box ms-2" id="R143C">
<div class="room">143C</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box ms-2" id="R143D">
<div class="room">143D</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box ms-2" id="R143E">
<div class="room">143E</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
</div>
<div class="d-flex flex-wrap mt-1">
<div class="room-box" id="R143F">
<div class="room">143F</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box ms-2" id="R143G">
<div class="room">143G</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box ms-2" id="R143H">
<div class="room">143H</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box ms-2" id="R143I">
<div class="room">143I</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
<div class="room-box ms-2" id="R143J">
<div class="room">143J</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
</div>
</div>
</div>
</div>
<!-- Right side: 151 + 155 -->
<div class="d-flex ms-5">
<!-- 151 -->
<div class="room-box d-flex flex-column justify-content-center" id="R151" style="min-height:160px">
<div class="room">151</div>
<div class="name">{name}</div>
<div class="ext">{ext}</div>
<p class="key-locker">Key Locker<br/>591336</p>
</div>
<!-- 155 -->
<div class="room-box ms-3 d-flex flex-column justify-content-center" id="R155" style="min-height:160px">
<div class="room">155</div>
<div class="name">Meeting &amp; Print Room</div>
<p class="key-locker">Key Locker<br/>591201</p>
<p class="ptr">PTR 388</p>
<p class="printer-serial">Serial # SAA7N047000781</p>
</div>
</div>
</div>
</div>
</div>
<!-- /Right side main area -->
</div>
<!-- End of Fourth/Fifth Section -------------------------------------------------- -->
</div>

</body>
</html>
);

export default Economics;
