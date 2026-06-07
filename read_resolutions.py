import os
import struct

def get_mp4_resolution(filepath):
    # Search for 'tkhd' atom in MP4
    with open(filepath, 'rb') as f:
        data = f.read()
        
    tkhd_idx = data.find(b'tkhd')
    if tkhd_idx != -1:
        # tkhd version & flags is 4 bytes
        # creation time, modification time, track ID, reserved is 16 bytes (or 32 bytes if version 1)
        # We need to check the version first.
        # tkhd_idx is at the start of 'tkhd' type. The size of atom is 4 bytes before it.
        # Let's parse version which is at tkhd_idx + 4
        version = data[tkhd_idx + 4]
        if version == 1:
            # 64-bit offsets
            # version & flags: 4
            # creation time: 8
            # modification time: 8
            # track id: 4
            # reserved: 4
            # duration: 8
            # reserved: 8
            # layer & alternate group: 4
            # volume & reserved: 4
            # matrix: 36
            # width: 4 (fixed point 16.16)
            # height: 4 (fixed point 16.16)
            offset = tkhd_idx + 4 + 4 + 8 + 8 + 4 + 4 + 8 + 8 + 4 + 4 + 36
        else:
            # 32-bit offsets
            # version & flags: 4
            # creation time: 4
            # modification time: 4
            # track id: 4
            # reserved: 4
            # duration: 4
            # reserved: 8
            # layer & alternate group: 4
            # volume & reserved: 4
            # matrix: 36
            # width: 4
            # height: 4
            offset = tkhd_idx + 4 + 4 + 4 + 4 + 4 + 4 + 8 + 4 + 4 + 36
            
        if offset + 8 <= len(data):
            width_fp = struct.unpack('>I', data[offset:offset+4])[0]
            height_fp = struct.unpack('>I', data[offset+4:offset+8])[0]
            return width_fp >> 16, height_fp >> 16
    return None

workspace_dir = r"c:\Users\wnals\OneDrive\바탕 화면\new\beauty-booth"
female_path = os.path.join(workspace_dir, "assets", "avatar_female.mp4")
male_path = os.path.join(workspace_dir, "assets", "avatar_male.mp4")

print("Female video resolution:", get_mp4_resolution(female_path))
print("Male video resolution:", get_mp4_resolution(male_path))
