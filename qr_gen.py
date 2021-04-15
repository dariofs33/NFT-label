import qrcode
from PIL import Image

linkLogo = input('path for logo: ')

logo = Image.open(linkLogo)
basewidth = int(input('Base Width [Default=50]: ') or '50')
wpercent = (basewidth/float(logo.size[0]))
hsize = int((float(logo.size[1])*float(wpercent)))
logo = logo.resize((basewidth,hsize), Image.ANTIALIAS)
qr = qrcode.QRCode(
    error_correction=qrcode.constants.ERROR_CORRECT_H
)
url = input(' ')
qr.add_data(url)
qr.make()
qr_color = 'Black'

img_qr = qr.make_image(fill_color=qr_color, back_color="white").convert('RGB')
pos = ((img_qr.size[0] - logo.size[0]) // 2, (img_qr.size[1] - logo.size[1]) // 2)
img_qr.paste(logo, pos)
save_path = input('filename for branded qr ')
img_qr.save(save_path)