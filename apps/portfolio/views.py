from django.shortcuts import render, redirect

from apps.portfolio.email_handler import send_message

# Create your views here.
def portfolio(request):
	data = {'portfolio': 'able',
		'contact': 'disabled',
		'calendar': 'disabled',
		'bio': 'disabled',
		'projects': 'disabled'}
	return render(request, 'portfolio_pages/portfolio.html', data)

def send_email(request, methods=['POST']):
	print('sending message')
	send_message(request.POST['name'], request.POST['return-address'], request.POST['message'])
	return redirect('portfolio')

def contact(request):
	data = {'portfolio': 'disabled',
		'contact': 'able',
		'calendar': 'disabled',
		'bio': 'disabled',
		'projects': 'disabled'}
	return render(request, 'portfolio_pages/portfolio.html', data)

def bio(request):
	data = {'portfolio': 'disabled',
		'contact': 'disabled',
		'calendar': 'disabled',
		'bio': 'able',
		'projects': 'disabled'}
	return render(request, 'portfolio_pages/portfolio.html', data)

def calendar(request):
	data = {'portfolio': 'disabled',
		'contact': 'disabled',
		'calendar': 'able',
		'bio': 'disabled',
		'projects': 'disabled'}
	return render(request, 'portfolio_pages/portfolio.html', data)

def projects(request):
	data = {'portfolio': 'desabled',
		'contact': 'disabled',
		'calendar': 'disabled',
		'bio': 'disabled',
		'projects': 'able'}
	return render(request, 'portfolio_pages/portfolio.html', data)

def bogus(request):
	return