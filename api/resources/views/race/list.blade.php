@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Races ({{ $reunion->label }})</div>

                <div class="panel-body">
                    @if (session('msg'))
                    <div class="alert alert-success">
                        {{ session('msg') }}
                    </div>
                    @endif
                    <table class="table table-striped task-table">
                        <thead>
                        <!--<th>id</th>-->
                        <!--<th>reunion</th>-->
                        <th></th>
                        <th>race</th>
                        <th>description</th>
                        <th>date</th>
                        <th>locale</th>
                        <th></th>
                        </thead>
                        <tbody>
                        @foreach ($races as $race)

                        <tr @if ($race->hasTranslation()) style="background-color: #1c7430; color: #FFF" @endif>
                            <!--<td class="table-text"><div>{{ $race->id }}</div></td>-->
                            <!--<td class="table-text"><div>{{ $race->reunion->label }}</div></td>-->
                            <td class="table-text"><div>R{{ $race->reunion->number }}C{{ $race->number}}</div></td>
                            <td class="table-text"><div>{{ $race->label }}</div></td>
                            <td class="table-text"><div>{{ $race->description }}</div></td>
                            <td class="table-text"><div>{{ $race->date }}</div></td>
                            <td class="table-text"><div>{{ $race->translations }}</div></td>
                            <td>
                                <a target="_blank" style="margin: 3px 0;" href="{{ url('admin/race/'.$race->id) }}" class="btn btn-primary">
                                    <i class="fa fa-btn fa-edit"></i>
                                </a>
                                <a target="_blank" style="margin: 3px 0;" href="{{ url('admin/race/'.$race->id.'/prediction/add') }}" class="btn btn-primary">
                                    predictions
                                </a>
                                <a style="margin: 3px 0;" target="_blank" href="{{ url('admin/runnersList/?raceId='.$race->id) }}" class="btn btn-primary">
                                    runners
                                </a>
                            </td>
                            <!-- Task Delete Button -->
                            <td>
                                <form action="{{ url('/admin/race/'.$race->id) }}" method="POST">
                                    {{ csrf_field() }}
                                    {{ method_field('DELETE') }}

                                    <button type="submit" class="btn btn-danger" onclick="return confirm('Remove the race ?')">
                                        <i class="fa fa-btn fa-trash"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                        @endforeach
                        </tbody>
                    </table>
                    <?php echo $races->render(); ?>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
