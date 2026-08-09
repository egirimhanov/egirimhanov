import shutil
import glob
import os

src_files = glob.glob(r'C:\Users\eming\.gemini\antigravity-cli\brain\f0950932-ca1f-4a31-8c1e-0e66f9b3743f\proxmox_homelab_*.jpg')
if src_files:
    dst_dir = r'C:\Users\eming\Documents\Code\Privat_Code\egirimhanov-github-profile\assets\img'
    os.makedirs(dst_dir, exist_ok=True)
    shutil.copy(src_files[0], os.path.join(dst_dir, 'proxmox_homelab.jpg'))
    print("Copied proxmox_homelab.jpg successfully")
