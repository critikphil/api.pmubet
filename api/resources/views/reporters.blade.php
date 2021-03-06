@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Reporters</div>

                <div class="panel-body">
                    @if (session('msg'))
                    <div class="alert alert-success">
                        {{ session('msg') }}
                    </div>
                    @endif
                    <table class="table table-striped task-table">
                        <thead>
                        <th>id</th>
                        <th>name</th>
                        <th>breed</th>
                        <th>color</th>
                        <th>date</th>
                        </thead>
                        <tbody>
                        @foreach ($reporters as $reporter)

                        <tr @if ($reporter->hasTranslation()) style="background-color: #1c7430; color: #FFF" @endif>
                            <td class="table-text"><div>{{ $reporter->id }}</div></td>
                            <td class="table-text"><div>{{ $reporter->societe }}</div></td>
                            <td class="table-text"><div>{{ $reporter->reporter }}</div></td>

                            <td class="table-text"><div>{{ $reporter->race->date }}</div></td>
                            <td class="table-text"><div>{{ $reporter->translations }}</div></td>
                            <td>
                                <a href="{{ url('admin/reporter/'.$reporter->id) }}" class="btn btn-primary">
                                    <i class="fa fa-btn fa-edit"></i>
                                </a>
                            </td>
                            <!-- Task Delete Button -->
                            <td>
                                <form action="{{ url('/admin/reporter/'.$reporter->id) }}" method="POST">
                                    {{ csrf_field() }}
                                    {{ method_field('DELETE') }}

                                    <button type="submit" class="btn btn-danger">
                                        <i class="fa fa-btn fa-trash"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                        @endforeach
                        </tbody>
                    </table>
                    <?php echo $reporters->render(); ?>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
