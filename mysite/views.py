from django.http import HttpResponse


def index(request):
    qust = 'd new'
    start_project_list = ['My project', 'Web network', 'Version: 2.1']
    output = ', '.join([qust for n in start_project_list])
    return HttpResponse(output)

