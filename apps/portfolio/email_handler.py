import smtplib
import os
from string import Template

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
rel_path = "email_template.txt"
abs_file_path = os.path.join(script_dir, rel_path)

def read_template(filename):
    """
    Returns a Template object comprising the contents of the 
    file specified by filename.
    """
    
    with open(filename, 'r', encoding='utf-8') as template_file:
        template_file_content = template_file.read()
    return Template(template_file_content)

def send_message(name, email, content):
	# read contacts
	message_template = read_template(abs_file_path)
	# set up the SMTP server
	s = smtplib.SMTP(host='smtp.gmail.com', port=587)
	s.starttls()
	s.login('barstowwebservice@gmail.com', 'puppiesInVegas!!')

	# For each contact, send the email:
	msg = MIMEMultipart()       # create a message

	# add in the actual person name to the message template
	message = message_template.substitute(NAME=name, EMAIL=email, MESSAGE=content)

	# Prints out the message body for our sake
	print(message)

	# setup the parameters of the message
	msg['From']='barstowwebservices@gmail.com'
	msg['To']='abarstowtx@gmail.com'
	msg['Subject']="MESSAGE FROM andrewbarstow.com"
    
	# add in the message body
	msg.attach(MIMEText(message, 'plain'))
        
	# send the message via the server set up earlier.
	s.send_message(msg)
	del msg
        
	# Terminate the SMTP session and close the connection
	s.quit()




if __name__ == '__main__':
    send_message()
