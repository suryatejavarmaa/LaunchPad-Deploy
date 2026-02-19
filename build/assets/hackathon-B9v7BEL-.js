import"./modulepreload-polyfill-B5Qt9EMX.js";import{q as H,c as L,d as S,w as N,g as T,s as ee,a as te,r as ae,b as re,u as oe,e as ne,f as se,h as ie}from"./firebaseConfig-SQs8Zglo.js";class v{constructor(t=0,a="Network Error"){this.status=t,this.text=a}}const le=()=>{if(!(typeof localStorage>"u"))return{get:e=>Promise.resolve(localStorage.getItem(e)),set:(e,t)=>Promise.resolve(localStorage.setItem(e,t)),remove:e=>Promise.resolve(localStorage.removeItem(e))}},l={origin:"https://api.emailjs.com",blockHeadless:!1,storageProvider:le()},q=e=>e?typeof e=="string"?{publicKey:e}:e.toString()==="[object Object]"?e:{}:{},ce=(e,t="https://api.emailjs.com")=>{if(!e)return;const a=q(e);l.publicKey=a.publicKey,l.blockHeadless=a.blockHeadless,l.storageProvider=a.storageProvider,l.blockList=a.blockList,l.limitRate=a.limitRate,l.origin=a.origin||t},$=async(e,t,a={})=>{const r=await fetch(l.origin+e,{method:"POST",headers:a,body:t}),o=await r.text(),s=new v(r.status,o);if(r.ok)return s;throw s},j=(e,t,a)=>{if(!e||typeof e!="string")throw"The public key is required. Visit https://dashboard.emailjs.com/admin/account";if(!t||typeof t!="string")throw"The service ID is required. Visit https://dashboard.emailjs.com/admin";if(!a||typeof a!="string")throw"The template ID is required. Visit https://dashboard.emailjs.com/admin/templates"},de=e=>{if(e&&e.toString()!=="[object Object]")throw"The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/"},z=e=>e.webdriver||!e.languages||e.languages.length===0,V=()=>new v(451,"Unavailable For Headless Browser"),me=(e,t)=>{if(!Array.isArray(e))throw"The BlockList list has to be an array";if(typeof t!="string")throw"The BlockList watchVariable has to be a string"},ue=e=>!e.list?.length||!e.watchVariable,fe=(e,t)=>e instanceof FormData?e.get(t):e[t],O=(e,t)=>{if(ue(e))return!1;me(e.list,e.watchVariable);const a=fe(t,e.watchVariable);return typeof a!="string"?!1:e.list.includes(a)},U=()=>new v(403,"Forbidden"),pe=(e,t)=>{if(typeof e!="number"||e<0)throw"The LimitRate throttle has to be a positive number";if(t&&typeof t!="string")throw"The LimitRate ID has to be a non-empty string"},be=async(e,t,a)=>{const r=Number(await a.get(e)||0);return t-Date.now()+r},X=async(e,t,a)=>{if(!t.throttle||!a)return!1;pe(t.throttle,t.id);const r=t.id||e;return await be(r,t.throttle,a)>0?!0:(await a.set(r,Date.now().toString()),!1)},K=()=>new v(429,"Too Many Requests"),ge=async(e,t,a,r)=>{const o=q(r),s=o.publicKey||l.publicKey,i=o.blockHeadless||l.blockHeadless,u=o.storageProvider||l.storageProvider,n={...l.blockList,...o.blockList},p={...l.limitRate,...o.limitRate};return i&&z(navigator)?Promise.reject(V()):(j(s,e,t),de(a),a&&O(n,a)?Promise.reject(U()):await X(location.pathname,p,u)?Promise.reject(K()):$("/api/v1.0/email/send",JSON.stringify({lib_version:"4.4.1",user_id:s,service_id:e,template_id:t,template_params:a}),{"Content-type":"application/json"}))},ye=e=>{if(!e||e.nodeName!=="FORM")throw"The 3rd parameter is expected to be the HTML form element or the style selector of the form"},he=e=>typeof e=="string"?document.querySelector(e):e,ve=async(e,t,a,r)=>{const o=q(r),s=o.publicKey||l.publicKey,i=o.blockHeadless||l.blockHeadless,u=l.storageProvider||o.storageProvider,n={...l.blockList,...o.blockList},p={...l.limitRate,...o.limitRate};if(i&&z(navigator))return Promise.reject(V());const b=he(a);j(s,e,t),ye(b);const f=new FormData(b);return O(n,f)?Promise.reject(U()):await X(location.pathname,p,u)?Promise.reject(K()):(f.append("lib_version","4.4.1"),f.append("service_id",e),f.append("template_id",t),f.append("user_id",s),$("/api/v1.0/email/send-form",f))},J={init:ce,send:ge,sendForm:ve,EmailJSResponseStatus:v},we="service_vlu54jh",Ee="template_qszwkih",Le="DBcRStc_qpakxhfG1";J.init(Le),console.log("✅ EmailJS initialized successfully");document.addEventListener("DOMContentLoaded",()=>{Ie()});async function Se(e){const t={to_email:e.email,user_name:e.fullName||"Participant",launchpad_id:e.registrationId,participation_type:e.participationType==="team"?"Team":"Individual",college_name:e.collegeName||"",team_name:e.teamName||"N/A"};try{const a=await J.send(we,Ee,t);return console.log("✅ Confirmation email sent successfully:",a.status,a.text),{success:!0}}catch(a){return console.error("❌ Failed to send confirmation email:",a),{success:!1,reason:"send_failed",error:a}}}function Ie(){const e=document.getElementById("splashScreen"),t=document.getElementById("mainContainer");if(!e){D();return}setTimeout(()=>{e.classList.add("hidden");const a=document.querySelector(".corner-logo");a&&a.classList.add("highlight"),t&&(t.style.display="block",D())},5500)}function D(){ke(),Me(),Re(),He(),$e(),ze()}function ke(){const e=document.getElementById("individual"),t=document.getElementById("team"),a=document.getElementById("teamDetails");if(!e||!t||!a)return;const r=()=>{t.checked?(a.classList.remove("hidden"),_(!0)):(a.classList.add("hidden"),_(!1),Te())};e.addEventListener("change",r),t.addEventListener("change",r)}function _(e){["teamName","teamSize","leaderName","leaderEmail"].forEach(a=>{const r=document.getElementById(a);r&&(r.required=e)})}function Te(){["teamName","teamSize","leaderName","leaderEmail"].forEach(a=>{const r=document.getElementById(a);r&&(r.value="")});const t=document.getElementById("teamMembersList");t&&(t.innerHTML="")}let d=0;function Me(){const e=document.getElementById("addMemberBtn"),t=document.getElementById("teamSize");e&&(xe(),e.addEventListener("click",()=>{const a=parseInt(t?.value)||5;d<a-1?qe():m("Maximum team members reached based on selected team size.","warning")}),t&&t.addEventListener("change",()=>{const a=parseInt(t.value)||5;for(;d>a-1;)Ce()}))}function xe(){document.body.addEventListener("input",e=>{if(e.target.type==="tel"){const t=e.target,a=t.value,o=a.replace(/[^0-9]/g,"").slice(0,10);a!==o&&(t.value=o)}})}function qe(){d++;const e=document.getElementById("teamMembersList"),t=document.createElement("div");t.className="team-member-card",t.id=`member-${d}`,t.innerHTML=`
        <div class="member-header">
            <span class="member-number">Team Member ${d}</span>
            <button type="button" class="remove-member" onclick="removeMember(${d})">✕</button>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label class="form-label">Name <span class="required">*</span></label>
                <input type="text" name="member${d}_name" class="form-input" placeholder="Member's full name" required>
            </div>
            <div class="form-group">
                <label class="form-label">Mobile Number <span class="required">*</span></label>
                <input type="tel" name="member${d}_mobile" class="form-input" placeholder="+91 XXXXX XXXXX" required maxlength="10" inputmode="numeric">
            </div>
            <div class="form-group">
                <label class="form-label">Email ID <span class="required">*</span></label>
                <input type="email" name="member${d}_email" class="form-input" placeholder="member@example.com" required>
            </div>
            <div class="form-group">
                <label class="form-label">LinkedIn <span class="required">*</span></label>
                <input type="url" name="member${d}_linkedin" class="form-input" placeholder="https://linkedin.com/in/..." required>
            </div>
        </div>
    `,e.appendChild(t)}function Be(e){const t=document.getElementById(`member-${e}`);t&&(t.style.animation="fadeOut 0.3s ease-out forwards",setTimeout(()=>{t.remove(),d--,Pe()},300))}function Ce(){const e=document.getElementById("teamMembersList");e&&e.lastChild&&(e.lastChild.remove(),d--)}function Pe(){document.querySelectorAll(".team-member-card").forEach((t,a)=>{const r=t.querySelector(".member-number");r&&(r.textContent=`Team Member ${a+1}`)})}window.removeMember=Be;function Re(){const e=document.getElementById("collegeId"),t=document.getElementById("filePreview"),a=document.querySelector(".file-upload-box");!e||!t||(e.addEventListener("change",M),a&&(a.addEventListener("dragover",r=>{r.preventDefault(),a.style.borderColor="var(--electric-blue)",a.style.background="rgba(0, 169, 255, 0.1)"}),a.addEventListener("dragleave",()=>{a.style.borderColor="rgba(255, 255, 255, 0.2)",a.style.background="rgba(255, 255, 255, 0.03)"}),a.addEventListener("drop",r=>{r.preventDefault(),a.style.borderColor="rgba(255, 255, 255, 0.2)",a.style.background="rgba(255, 255, 255, 0.03)",r.dataTransfer.files.length&&(e.files=r.dataTransfer.files,M({target:e}))})))}function M(e){const t=e.target.files[0],a=document.getElementById("filePreview"),r=document.querySelector(".file-upload-box");if(!t){a.classList.remove("active"),a.innerHTML="",r&&(r.style.display="block");return}if(t.size>5*1024*1024){m("File size must be less than 5MB","error"),e.target.value="";return}if(!["image/jpeg","image/png","image/jpg","application/pdf"].includes(t.type)){m("Please upload a valid image (JPG, PNG) or PDF file","error"),e.target.value="";return}const s=Fe(t.size);if(t.type.startsWith("image/")){const i=new FileReader;i.onload=u=>{a.innerHTML=`
                <img src="${u.target.result}" alt="ID Preview">
                <div class="file-info">
                    <span class="file-name">${t.name}</span>
                    <span class="file-size">${s}</span>
                </div>
                <span class="remove-file" onclick="clearFileInput()">✕</span>
            `,a.classList.add("active"),r&&(r.style.display="none")},i.readAsDataURL(t)}else a.innerHTML=`
            <span style="font-size: 2rem;">📄</span>
            <div class="file-info">
                <span class="file-name">${t.name}</span>
                <span class="file-size">${s}</span>
            </div>
            <span class="remove-file" onclick="clearFileInput()">✕</span>
        `,a.classList.add("active"),r&&(r.style.display="none")}function G(){const e=document.getElementById("collegeId"),t=document.getElementById("filePreview"),a=document.querySelector(".file-upload-box");e&&(e.value=""),t&&(t.classList.remove("active"),t.innerHTML=""),a&&(a.style.display="block")}window.clearFileInput=G;function Fe(e){return e<1024?e+" B":e<1024*1024?(e/1024).toFixed(1)+" KB":(e/(1024*1024)).toFixed(1)+" MB"}function He(){const e=document.getElementById("registrationForm");if(!e)return;e.querySelectorAll(".form-input, .form-select, .form-textarea").forEach(a=>{a.addEventListener("blur",()=>x(a)),a.addEventListener("input",()=>{a.classList.contains("error")&&x(a)})}),e.addEventListener("submit",Ne)}function x(e){const t=e.parentElement.querySelector(".error-message");let a=!0,r="";if(e.closest(".hidden"))return!0;const o=e.value.trim();if(e.required&&!o)a=!1,r="This field is required";else if(e.type==="email"&&o)/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o)||(a=!1,r="Please enter a valid email address");else if(e.type==="tel"&&o){const s=/^\d{10}$/,i=o.replace(/[-\s]/g,"");s.test(i)?e.value:(a=!1,r="Please enter a valid 10-digit mobile number")}else if(e.type==="url"&&o)try{const s=new URL(o);s.protocol!=="http:"&&s.protocol!=="https:"&&(a=!1,r="URL must start with http:// or https://"),(e.id==="linkedin"||e.name?.includes("linkedin"))&&(/^https?:\/\/(www\.)?linkedin\.com\/in\/.+/i.test(o)||(a=!1,r="Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)"))}catch{a=!1,r="Please enter a valid URL (include http:// or https://)"}return a?(e.classList.remove("error"),t&&(t.textContent="",t.classList.remove("visible"))):(e.classList.add("error"),t&&(t.textContent=r,t.classList.add("visible"))),a}async function Ne(e){e.preventDefault();const t=e.target;let a=!0;t.querySelectorAll(".form-input:not(:disabled), .form-select:not(:disabled), .form-textarea:not(:disabled)").forEach(n=>{n.closest(".hidden")||x(n)||(a=!1)}),t.querySelectorAll(".consent-checkbox[required]").forEach(n=>{n.checked||(a=!1,m("Please agree to all required terms and conditions","error"))});const s=t.querySelector('input[name="participationType"]:checked');s||(a=!1,m("Please select a participation type","error"));const i=t.querySelector('input[name="photoConsent"]:checked');i||(a=!1,m("Please select your photo/video consent preference","error"));const u=document.getElementById("collegeId");if(!u||!u.files||u.files.length===0){a=!1,m("Please upload your College ID Card","error");const n=u?.parentElement?.parentElement?.querySelector(".error-message");n&&(n.textContent="College ID Card is required",n.classList.add("visible"))}if(a){const n=t.querySelector(".submit-btn"),p=n.innerHTML;n.disabled=!0,n.innerHTML='<span class="btn-text">Checking...</span>';try{const b=t.querySelector("#email").value,f=t.querySelector("#mobile").value,Y=H(L(S,"registrations"),N("email","==",b));if(!(await T(Y)).empty){n.disabled=!1,n.innerHTML=p,A("email",b);return}const W=H(L(S,"registrations"),N("mobile","==",f));if(!(await T(W)).empty){n.disabled=!1,n.innerHTML=p,A("mobile",f);return}n.innerHTML='<span class="btn-text">Uploading ID...</span>';const w=document.getElementById("collegeId")?.files[0];let I="",C="";if(w)try{await ee(te);const g=Date.now(),P=w.name.replace(/[^a-zA-Z0-9.]/g,"_"),R=`college-ids/${g}_${P}`,k=ae(re,R),y=await oe(k,w);I=await ne(y.ref),C=w.name,console.log("File uploaded successfully:",I)}catch(g){console.error("Error uploading file:",g),m("Failed to upload ID card. Please try again.","error"),n.disabled=!1,n.innerHTML=p;return}n.innerHTML='<span class="btn-text">Submitting...</span>';const c={fullName:t.querySelector("#fullName")?.value||"",email:t.querySelector("#email")?.value||"",mobile:t.querySelector("#mobile")?.value||"",altMobile:t.querySelector("#altMobile")?.value||"",collegeName:t.querySelector("#collegeName")?.value||"",collegeLocation:t.querySelector("#collegeLocation")?.value||"",institutionType:t.querySelector('input[name="institutionType"]:checked')?.value||"",department:t.querySelector("#department")?.value||"",yearOfStudy:t.querySelector("#yearOfStudy")?.value||"",participationType:s?.value||"",linkedin:t.querySelector("#linkedin")?.value||"",portfolio:t.querySelector("#portfolio")?.value||"",github:t.querySelector("#github")?.value||"",hearAbout:t.querySelector("#hearAbout")?.value||"",specialRequirements:t.querySelector("#specialRequirements")?.value||"",photoConsent:i?.value||"",termsAccepted:t.querySelector("#termsCheckbox")?.checked||!1,codeOfConductAccepted:t.querySelector("#codeOfConductCheckbox")?.checked||!1,timestamp:se(),collegeIdFileName:C,collegeIdUrl:I};if(s?.value==="team"){c.teamName=t.querySelector("#teamName")?.value||"",c.teamSize=t.querySelector("#teamSize")?.value||"",c.leaderName=t.querySelector("#leaderName")?.value||"",c.leaderEmail=t.querySelector("#leaderEmail")?.value||"";const g=[];document.querySelectorAll(".team-member-card").forEach((R,k)=>{const y=k+1,F={name:t.querySelector(`[name="member${y}_name"]`)?.value||"",mobile:t.querySelector(`[name="member${y}_mobile"]`)?.value||"",email:t.querySelector(`[name="member${y}_email"]`)?.value||"",linkedin:t.querySelector(`[name="member${y}_linkedin"]`)?.value||""};F.name&&g.push(F)}),c.teamMembers=g}const Q=(await T(L(S,"registrations"))).size+1,E=`Launch-${String(Q).padStart(3,"0")}`;c.registrationId=E,c.emailSent=!1;const Z=await ie(L(S,"registrations"),c);console.log("Registration saved successfully with ID:",Z.id,"RegID:",E),De(E,c.email),n.innerHTML='<span class="btn-text">Submitted</span>',Se({email:c.email,fullName:c.fullName,registrationId:E,participationType:c.participationType,collegeName:c.collegeName,teamName:c.teamName||""}).catch(g=>{console.error("📧 Email sending error (non-blocking):",g)})}catch(b){console.error("Error saving registration:",b),m("Failed to submit registration. Please try again.","error"),n.disabled=!1,n.innerHTML=p}}else{const n=t.querySelector(".error");n&&(n.scrollIntoView({behavior:"smooth",block:"center"}),n.focus())}}function De(e){const t=document.getElementById("successModal"),a=document.getElementById("successRegId");e&&a&&(a.textContent=e,a.style.color="var(--electric-blue)"),t&&(t.classList.remove("hidden"),document.body.style.overflow="hidden",_e())}function _e(){const e=document.getElementById("confettiContainer");if(!e)return;e.innerHTML="";const t=["#ef4444","#3b82f6","#22c55e","#eab308","#8b5cf6","#f97316","#ec4899","#06b6d4"],a=100;for(let r=0;r<a;r++){const o=document.createElement("div");o.className="confetti",o.style.left=`${Math.random()*100}%`,o.style.backgroundColor=t[r%t.length],o.style.animationDuration=`${2.5+Math.random()*2.5}s`,o.style.animationDelay=`${Math.random()*2}s`,o.style.transform=`rotate(${Math.random()*360}deg)`,Math.random()>.5&&(o.style.width="8px",o.style.height="8px",o.style.borderRadius="50%"),e.appendChild(o)}setTimeout(()=>{e.innerHTML=""},6e3)}function Ae(){const e=document.getElementById("successModal");if(e){e.classList.add("hidden"),document.body.style.overflow="";const t=document.getElementById("registrationForm");if(t){t.reset();const o=t.querySelector(".submit-btn");o&&(o.disabled=!1,o.innerHTML=`
                    <span class="btn-text">Register Now</span>
                    <span class="btn-icon-right">🚀</span>
                    <div class="btn-glow"></div>
                `)}const a=document.getElementById("teamMembersList");a&&(a.innerHTML=""),d=0;const r=document.getElementById("teamDetails");r&&r.classList.add("hidden"),G()}}window.closeModal=Ae;function A(e,t){const a=`
        <div id="duplicateModal" class="modal" style="z-index: 2000;">
            <div class="modal-content" style="
                max-width: 500px;
                background: linear-gradient(145deg, rgba(30, 20, 40, 0.98), rgba(20, 15, 30, 0.98));
                border: 2px solid;
                border-image: linear-gradient(135deg, var(--bright-red), var(--electric-blue)) 1;
                border-radius: 20px;
                padding: 2.5rem;
                text-align: center;
                box-shadow: 0 0 60px rgba(255, 8, 68, 0.4), 0 0 40px rgba(0, 169, 255, 0.3);
                animation: shakeModal 0.5s ease-in-out;
            ">
                <div style="font-size: 4rem; margin-bottom: 1rem;">⚠️</div>
                <h2 style="
                    font-size: 1.8rem;
                    font-weight: 700;
                    background: linear-gradient(135deg, var(--bright-red), var(--electric-blue));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 1rem;
                ">Registration Already Exists!</h2>
                <p style="
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: 0.5rem;
                ">This ${e==="email"?"email address":"phone number"} is already registered:</p>
                <p style="
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: var(--electric-blue);
                    margin-bottom: 1.5rem;
                ">${t}</p>
                <p style="
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.6);
                    margin-bottom: 2rem;
                ">Please use a different ${e==="email"?"email address":"phone number"} or contact support if you believe this is an error.</p>
                <button onclick="closeDuplicateModal()" style="
                    background: linear-gradient(135deg, var(--bright-red), var(--electric-blue));
                    border: none;
                    border-radius: 12px;
                    padding: 0.875rem 2rem;
                    color: white;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(0, 169, 255, 0.5)'" onmouseout="this.style.transform=''; this.style.boxShadow=''">
                    Got it
                </button>
            </div>
        </div>
    `,r=document.createElement("style");r.textContent=`
        @keyframes shakeModal {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
            20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
    `,document.head.appendChild(r),document.body.insertAdjacentHTML("beforeend",a),document.body.style.overflow="hidden"}window.closeDuplicateModal=function(){const e=document.getElementById("duplicateModal");e&&(e.remove(),document.body.style.overflow="")};function m(e,t="info"){const a=document.querySelector(".toast");a&&a.remove();const r=document.createElement("div");r.className=`toast toast-${t}`,r.style.cssText=`
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        padding: 1rem 2rem;
        background: ${t==="error"?"var(--error)":t==="warning"?"var(--warning)":"var(--success)"};
        color: white;
        border-radius: 50px;
        font-weight: 500;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        animation: slideUp 0.3s ease-out;
    `,r.textContent=e,document.body.appendChild(r),setTimeout(()=>{r.style.animation="fadeOut 0.3s ease-out forwards",setTimeout(()=>r.remove(),300)},3e3)}function $e(){const e=document.createElement("style");e.textContent=`
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translate(-50%, 20px); }
            to { opacity: 1; transform: translate(-50%, 0); }
        }
    `,document.head.appendChild(e);const t=new IntersectionObserver(a=>{a.forEach(r=>{r.isIntersecting&&r.target.classList.add("animate-in")})},{threshold:.1});document.querySelectorAll(".form-section").forEach(a=>{t.observe(a)})}function je(e){document.body.setAttribute("data-theme",e);const t=document.querySelector(".orb-red"),a=document.querySelector(".orb-blue");e==="fire"?a.style.background="radial-gradient(circle, var(--bright-red) 0%, transparent 70%)":e==="ice"?t.style.background="radial-gradient(circle, var(--electric-blue) 0%, transparent 70%)":(t&&(t.style.background=""),a&&(a.style.background=""))}window.setTheme=je;let h=null;function ze(){const e=document.getElementById("startCameraBtn"),t=document.getElementById("captureBtn");e&&e.addEventListener("click",Ve),t&&t.addEventListener("click",Xe)}function Ve(){const e=document.getElementById("cameraModal");e&&(e.classList.remove("hidden"),Oe(),document.body.style.overflow="hidden")}function B(){const e=document.getElementById("cameraModal");e&&(e.classList.add("hidden"),Ue(),document.body.style.overflow="")}window.closeCameraModal=B;async function Oe(){const e=document.getElementById("cameraStream");try{h=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:!1}),e.srcObject=h}catch(t){console.error("Error accessing camera:",t),m("Could not access camera. Please check permissions.","error"),B()}}function Ue(){h&&(h.getTracks().forEach(e=>e.stop()),h=null)}function Xe(){const e=document.getElementById("cameraStream"),t=document.getElementById("cameraCanvas"),a=document.getElementById("collegeId");if(!e||!t)return;t.width=e.videoWidth,t.height=e.videoHeight,t.getContext("2d").drawImage(e,0,0,t.width,t.height),t.toBlob(o=>{const s=new File([o],"id-card-capture.jpg",{type:"image/jpeg"}),i=new DataTransfer;i.items.add(s),a.files=i.files,M({target:a}),B(),m("Photo captured successfully!","success")},"image/jpeg",.95)}function Ke(e){e.preventDefault(),e.stopPropagation();const a=e.target.closest(".resource-card")?.dataset.file;if(!a){console.error("PDF path not found");return}const r=document.getElementById("pdfViewerModal"),o=document.getElementById("pdfViewerObject"),s=document.getElementById("pdfDownloadBtn"),i=document.getElementById("pdfFallbackLink");r&&o&&(o.data=a,i&&(i.href=a,i.download="BRISTLETECH-LAUNCHPAD-HACKATHON.pdf"),s&&(s.href=a,s.download="BRISTLETECH-LAUNCHPAD-HACKATHON.pdf"),r.classList.remove("hidden"),document.body.style.overflow="hidden")}function Je(){const e=document.getElementById("pdfViewerModal"),t=document.getElementById("pdfViewerObject");e&&(e.classList.add("hidden"),document.body.style.overflow="",t&&(t.data=""))}window.openPDFViewer=Ke;window.closePDFViewer=Je;
